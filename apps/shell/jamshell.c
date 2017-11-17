void* getHealth(char *);

struct programInfo {
	char* path;
	char* name;
};

/**
* Starts the C node of an exec'd program
* @param name of the program to exec
*/
//runc progName.jxe --app=progName
void* startC(void *pinfo) {

		struct programInfo *info = pinfo;

		char* runc = "/usr/local/bin/runc";

        char* progName = (char*)info->name;
		char appNameArg[256];
		char* appNamePrefix = "--app=";
		strcpy(appNameArg, appNamePrefix);
		strcat(appNameArg, progName);
		printf("appnamearg: %s\n", appNameArg);

        char* programPath = (char*)info->path;
		char pathArg[256];
		strcpy(pathArg, programPath);
		strcat(pathArg, "/");
		strcat(pathArg, progName);
		strcat(pathArg, ".jxe");
		printf("patharg: %s\n", pathArg);

        char *args[5];
        args[0] = "runc";
        args[1] = pathArg;
        args[2] = appNameArg;
        args[3] = NULL;

        if (fork() == 0) {
			execvp(runc, args);
        }
        free(info);
}
/**
* Takes care of spawning the pthread to exec the C node of pname
* @param name of the program to exec
*/
jasync execProg(char *path, char* progName) {
	struct programInfo *pinfo;
	pinfo = malloc(sizeof(*pinfo));
	pinfo->path = path;
	pinfo->name = progName;

	pthread_t tidC;
	sleep(1);
	int errC;
	errC = pthread_create(&tidC, NULL, &startC, pinfo);
	if(errC != 0) {
		printf("Could not create thread for exec C.\n");
	} else {
		printf("Exec C completed succesfully.\n");
	}
	pthread_detach(tidC);
}

jasync forwardHealthCommand(char* node) {
	printf("JCond broadcast requested for health...\n");
	getHealth(node);
}

int main() {
	printf("C node online...\n");
}