/*

The MIT License (MIT)
Copyright (c) 2011 Derek Ingrouville, Julien Lord, Muthucumaru Maheswaran

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

#ifdef __cplusplus
extern "C" {
#endif

#ifndef __CALLBACK_H
#define __CALLBACK_H

#include "event.h"

struct Application;

typedef void (*EventCallback)(struct Application *d, Event *e, void *data);

typedef struct CallbackList {
    char *aname;
    EventCallback cb;
    void *data;
    struct CallbackList *next;
} CallbackList;

typedef struct Callbacks {
    // Other types of callback handlers could be added here.
    CallbackList *errorHandlers;
    CallbackList *completeHandlers;
    CallbackList *cancelHandlers;
    CallbackList *verifyHandlers;
    CallbackList *callbackHandlers;
} Callbacks;

CallbackList *callbacklist_new();
void callbacklist_free(CallbackList *list);
CallbackList *callbacklist_add(CallbackList *list, char *aname, EventCallback cb, void *data);
void callbacklist_call(CallbackList *list, struct Application *app, Event *event);

Callbacks *callbacks_new();
void callbacks_free(Callbacks *callbacks);
void callbacks_add(Callbacks *callbacks, char *actname, EventType type, EventCallback cb,  void *data);
void callbacks_call(Callbacks *callbacks, struct Application *app, Event *event);

#endif /* __CALLBACK_H */

#ifdef __cplusplus
}
#endif