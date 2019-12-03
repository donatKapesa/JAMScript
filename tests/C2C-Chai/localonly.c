
void localonlyjs(char *c);

jasync localme(int c, char *s)
{
  while(1)
    {
      jsleep(20);
      printf("############-->>> Hello  ME  %d, %s\n", c, s);
      localonlyjs("Hello ME");
    }
}

jasync localyou(int c, char *s)
{
  while(1)
    {
      jsleep(100);
      printf("############-->>> Hello YOU  %d, %s\n", c, s);
      localonlyjs("Hello YOU");
    }
}

int main(int argc, char *argv[])
{
  localme(10, "cxxxxxxxx");
  localyou(10, "cxxxxxxxx");
}
