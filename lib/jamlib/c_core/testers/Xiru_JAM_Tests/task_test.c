#include "jam.h"
#include "command.h"
#include <stdio.h>
#include <string.h>

void t1(void *args){
  while(1){
    printf("--------HEY-------\n");
    sleep(2);
    int val = taskyield();
    printf("Task Num %d\n", val);
  }
}

void t2(void * args){
  while(1){
    printf("--------YES-------\n");
    sleep(2);
    int val = taskyield();
    printf("Task Num %d\n", val);
  }
}

void taskmain(){
  jamstate_t *js = jam_init();
  taskcreate(t1, js, STACKSIZE);
  taskcreate(t2, js, STACKSIZE);
}
