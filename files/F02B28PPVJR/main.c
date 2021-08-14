#include <sys/mman.h>
#include <stdlib.h>

int main()
{
  char *mem;
  posix_memalign(&mem, 4096, 4096);
  mprotect(mem, 4096, PROT_READ | PROT_WRITE | PROT_EXEC);
  // movq $42, %rdi
  mem[0] = 0x48;
  mem[1] = 0xc7;
  mem[2] = 0xc7;
  mem[3] = 0x2a;
  mem[4] = 0x00;
  mem[5] = 0x00;
  mem[6] = 0x00;
  // movq $60, %rax
  mem[7] = 0x48;
  mem[8] = 0xc7;
  mem[9] = 0xc0;
  mem[10] = 0x3c;
  mem[11] = 0x00;
  mem[12] = 0x00;
  mem[13] = 0x00;
  // syscall
  mem[14] = 0x0f;
  mem[15] = 0x05;
  ((void (*)())mem)();
}