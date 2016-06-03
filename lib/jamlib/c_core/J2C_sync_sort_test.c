#include "jam.h"
#include "command.h"

void jam_run_app(void *arg)
{
    jamstate_t *js = (jamstate_t *)arg;
    
}

void taskmain(int argc, char **argv)
{
    jamstate_t *js = jam_init();

    activity_regcallback(js->atable, "hellofk", ASYNC, "sis", callhellofk);

    // Start the event loop in another thread.. with cooperative threads.. we
    // to yield for that thread to start running
    taskcreate(jam_event_loop, js, STACKSIZE);

    // create the application runner
    taskcreate(jam_run_app, js, STACKSIZE);
    printf("In main......................... \n");
}
