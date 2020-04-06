void you(char *val);

jasync loop() {
    char *p;

    while(1) {
	p = pstr;
	printf("Received string: %s\n", p);
  you(p);
    }
}


int main() {

    loop();
}
