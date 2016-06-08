#include "jam.h"
#include "command.h"
#include <time.h>

#define TIMER 1
//Current Problem with this is that Time out is kind of annoying because JAMlib doesn't deal with it yet
void jam_run_app(void *arg)
{
    jamstate_t *js = (jamstate_t *)arg;
    long double prev_time;
    long double curr_time;
    long double accumulated_difference = 0;
    int i;
    //for (i = 0; i < 1000; i++) {
        //printf("############################################ i = %d\n", i);
    for(i = 1; i < 100000; i++){
        printf("------------ROUND %d--------------\n", i);
        printf("Setting up at timer for %d seconds. \n", TIMER);
        struct timespec tp;
        clock_gettime(CLOCK_MONOTONIC_RAW, &tp);
        prev_time = tp.tv_sec + tp.tv_nsec/100000000.0;
        printf("Current Time is %Lf\n", prev_time);
        arg_t *res = jam_rexec_sync(js, "timer", "sii", "f", TIMER);
        command_arg_free(res);
        clock_gettime(CLOCK_MONOTONIC_RAW, &tp);
        curr_time = tp.tv_sec + tp.tv_nsec/100000000.0;
        accumulated_difference += (curr_time - prev_time);
        printf("Time after timer is %Lf\n", curr_time);
        printf("\n-----------------------------------------\nTime difference is %Lf\n------------------------------------------\n", accumulated_difference/i);
      }
    //}
}


void taskmain(int argc, char **argv)
{
    jamstate_t *js = jam_init();

    // Start the event loop in another thread.. with cooperative threads.. we
    // to yield for that thread to start running
    taskcreate(jam_event_loop, js, STACKSIZE);

    // create the application runner
    taskcreate(jam_run_app, js, STACKSIZE);
    printf("Commencing JAM operation \n");
}
