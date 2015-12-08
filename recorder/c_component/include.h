#ifdef _DEBUG
#define _DEBUG_WAS_DEFIND 1
#undef _DEBUG
#endif
#include<Python.h>
#ifdef _DEBUG_WAS_DEFIND
#define _DEBUG 1
#endif