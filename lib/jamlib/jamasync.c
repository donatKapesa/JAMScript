
#include "jam.h"
#include "core.h"

#include <strings.h>
#include <string.h>
#include <pthread.h>
#include "free_list.h"


jactivity_t *jam_rexec_async(jamstate_t *js, char *aname, char *fmask, ...)
{
    va_list args;
    nvoid_t *nv;
    int i = 0;
    arg_t *qargs;

    assert(fmask != NULL);

    if (strlen(fmask) > 0)
        qargs = (arg_t *)calloc(strlen(fmask), sizeof(arg_t));
    else
        qargs = NULL;

    cbor_item_t *arr = cbor_new_indefinite_array();
    cbor_item_t *elem;
    struct alloc_memory_list *list = init_list_();

    va_start(args, fmask);

    while (*fmask)
    {
        elem = NULL;
        switch(*fmask++)
        {
            case 'n':
                nv = va_arg(args, nvoid_t*);
                elem = cbor_build_bytestring(nv->data, nv->len);
                qargs[i].val.nval = nv;
                qargs[i].type = NVOID_TYPE;
                break;
            case 's':
                qargs[i].val.sval = strdup(va_arg(args, char *));
                qargs[i].type = STRING_TYPE;
                elem = cbor_build_string(qargs[i].val.sval);
                break;
            case 'i':
                qargs[i].val.ival = va_arg(args, int);
                qargs[i].type = INT_TYPE;
                elem = cbor_build_uint32(abs(qargs[i].val.ival));
                if (qargs[i].val.ival < 0)
                    cbor_mark_negint(elem);
                break;
            case 'd':
            case 'f':
                qargs[i].val.dval = va_arg(args, double);
                qargs[i].type = DOUBLE_TYPE;
                elem = cbor_build_float8(qargs[i].val.dval);
                break;
            default:
                break;
        }
        i++;
        if (elem != NULL){
            assert(cbor_array_push(arr, elem) == true);
            add_to_list_(elem, list);
          }
    }
    va_end(args);

    // Need to add start to activity_new()
    jactivity_t *jact = activity_new(js->atable, activity_gettime());

    if (jact != NULL)
    {
        command_t *cmd = command_new_using_cbor("REXEC-ASY", "-", aname, jact->actid, js->cstate->device_id, arr, qargs, i);
        cmd->cbor_item_list = list;

        jam_async_runner(js, jact, cmd);
        return jact;
    } 
    else
        return NULL;
}


void jam_async_runner(jamstate_t *js, jactivity_t *jact, command_t *cmd)
{
    command_t *rcmd;
    int error_count = 0;

    // TODO: Why should we use a runtable? Long term tracking 
    // of activities we have run? When are the entries deleted?
    // Can we just use the activity table?
    // May be we can't because the activity table is tied to the 
    // socket (queue) and we need to reuse them sooner?
    //
    insert_runtable_entry(js, cmd);
    runtableentry_t *act_entry = find_table_entry(js->rtable, cmd);

    if (act_entry == NULL)
    {
        printf("Cannot find activity ... \n");
        jact->state = FATAL_ERROR;
        return;
    }

    // Send the command to the remote side  
    // The send is executed via the worker thread..
    queue_enq(jact->outq, cmd, sizeof(command_t));

    // We expect act_entry->num_replies from the remote side 
    for (int i = 0; i < act_entry->num_replies; i++)
    {
        // TODO: Fix the constant 300 milliseconds here..        
        nvoid_t *nv = pqueue_deq_timeout(jact->inq, 300);

        rcmd = NULL;
        if (nv != NULL) 
        {
            rcmd = (command_t *)nv->data;
            free(nv);
        } 
        else 
            error_count++;

        if (rcmd == NULL)
            error_count++;
        else
            jact->replies[i - error_count] = rcmd;
    }

    if (error_count > 0) 
        jact->state = PARTIAL;
    else
    {
        // Examine the replies to form the status code
        for (int i = 0; i < act_entry->num_replies; i++)
        {
            printf("Waiting for reply...................... %d\n", i);
            if (strcmp(jact->replies[i]->cmd, "REXEC-ACK") == 0)
                jact->state = MAX(jact->state, STARTED);
            else
            if ((strcmp(jact->replies[i]->cmd, "REXEC-NAK") == 0) &&
                (strcmp(jact->replies[i]->args[0].val.sval, "ILLEGAL-PARAMS") == 0))
                jact->state = MAX(jact->state, PARAMETER_ERROR);
            else
            if ((strcmp(jact->replies[i]->cmd, "REXEC-NAK") == 0) &&
                (strcmp(jact->replies[i]->args[0].val.sval, "NOT-FOUND") == 0))
                jact->state = MAX(jact->state, FATAL_ERROR);
            else
            if ((strcmp(jact->replies[i]->cmd, "REXEC-NAK") == 0) &&
                (strcmp(jact->replies[i]->args[0].val.sval, "CONDITION-FALSE") == 0))
                jact->state = MAX(jact->state, NEGATIVE_COND);
        }
    }

    // rcmd should not be freed.. it will be freed when activity is released

}