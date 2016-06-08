#include "jam.h"
#include "command.h"
#include <stdio.h>
#include <string.h>

#define NUM_MSG 20

int ID = 0;
void jam_run_app(void *arg)
{
    char * buf = NULL;;
    size_t len = 0;
    printf("Enter your desired username: ");
    getline(&buf, &len, stdin);
    jamstate_t *js = (jamstate_t *)arg;
    arg_t *res = jam_rexec_sync(js, "get_new_id", "s", "GET_ID");
    ID = res->val.ival;
    printf("Currently ID :%d\n", ID);
    free(res);
    res = jam_rexec_sync(js, "get_past_msg", "i" , NUM_MSG);
    printf("\n\n-----------------BEGIN--------------------\n\n");
    printf("Client Service Initiated ...  \n%s\n", res->val.sval);
    command_arg_free(res);
    char * usr_name = strdup(buf);
    usr_name[strlen(usr_name) - 1] = ' ';
    free(buf);
    len = 0;

    while(1){
      printf("\n\n\n%s: ", usr_name);
      taskdelay(2000);
      getline(&buf, &len, stdin);
      printf("\n\n\n");
      jam_rexec_async(js, "j_node_get_msg", "ssi" , usr_name, buf, ID);
      len = 0;
      free(buf);
      taskyield();
      //int tasks = taskdelay(1000);
      //printf("-----#%d-----\n", tasks);
    }

}

void c_node_get_msg(char * usr_name, char * msg, int msg_id){
    printf("\n----------------You have received a Message-------------------\n");
    //if(msg_id != ID)
      printf("%s:%s", usr_name, msg);
}


void callc_node_get_msg(void *act, void *arg)
{
    printf("\n\n----------------------------------------------\n");
    command_t *cmd = (command_t *)arg;
    c_node_get_msg(cmd->args[0].val.sval, cmd->args[1].val.sval, cmd->args[2].val.ival);
    printf("\n------------------------------------------------\n\n");
    //command_free(cmd);
}


void taskmain(int argc, char **argv)
{
    jamstate_t *js = jam_init();

    // Start the event loop in another thread.. with cooperative threads.. we
    // to yield for that thread to start running
    taskcreate(jam_event_loop, js, STACKSIZE);

    // create the application runner
    taskcreate(jam_run_app, js, STACKSIZE);
    activity_regcallback(js->atable, "c_node_get_msg", ASYNC, "ssi", callc_node_get_msg);

    printf("Commencing JAM operation \n");
    while(1)
      taskdelay(1000);
}
