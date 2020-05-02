int getfogid();
int getcloudid();
int getdevid();


int q, p;
jasync localme(int c,)
{
  while(1)
    {
      jsleep(2000);
      setfogid(c);
      printf("############-->>> Hello C fog  %d\n", c);
    }
}

jasync localyou(int c)
{
  while(1)
    {
      jsleep(1000);
      setcloudid(c);
      printf("############-->>> Hello C Cloud  %d\n", c);
    }
}

jasync localthey(int c)
{
  while(1)
    {
      jsleep(1000);
      setdevid(c);
      printf("############-->>> Hello C Dev  %d\n", c);
    }
}

int main(int argc, char *argv[])
{
  localme(1);
  localyou(2);
  localthey(3);
}
