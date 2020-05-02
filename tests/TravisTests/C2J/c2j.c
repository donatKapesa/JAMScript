
int setid(int);

jasync localme(int c)
{
  while(1)
    {
      jsleep(2000);
      setid(c);
      printf("############-->>> Hello C fog  %d\n", c);
    }
}

int main(int argc, char *argv[])
{
  localme(1);
}
