int getid();
void you(char *s);
void me(int id);


int q;
jasync localme(int c, char *s)
{
  while(1)
    {
      jsleep(2000);
      q = getid();
      printf("############-->>> Hello  ME  %d... %s... %d\n", c, s, q);
      //me(q);
    }
}

jasync localyou(int c, char *s)
{
  while(1)
    {
      jsleep(1000);
      printf("############-->>> Hello YOU  %d, %s\n", c, s);
      you(s);
    }
}

int main(int argc, char *argv[])
{
  localme(10, "cxxxxyyyy");
  localyou(10, "cxxxxxxxx");
}
