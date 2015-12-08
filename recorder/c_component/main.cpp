#include"include.h"
#define _WIN32_WINNT    0x0501        //xp
#include <windows.h>



HBITMAP GetScreenBmp(HDC hdc ,int x=100,int y=100,int w=640,int h=480) {
	// Get screen dimensions
	

	// Create compatible DC, create a compatible bitmap and copy the screen using BitBlt()
	HDC hCaptureDC = CreateCompatibleDC(hdc);
	HBITMAP hBitmap = CreateCompatibleBitmap(hdc, w, h);
	HGDIOBJ hOld = SelectObject(hCaptureDC, hBitmap);
	BOOL bOK = BitBlt(hCaptureDC, -x, -y, x+w, y+h, hdc, 0, 0, SRCCOPY | CAPTUREBLT);

	SelectObject(hCaptureDC, hOld); // always select the previously selected object once done
	DeleteDC(hCaptureDC);
	return hBitmap;
}






static PyObject *spam_system(PyObject *self, PyObject *args)
{
	int len = 5;
	const BYTE* lpPixels;
	bool neadnew = false;
	int x = 0, y = 0, w = 0, h = 0;
	if (!PyArg_ParseTuple(args, "s#|(ii)(ii)", &lpPixels, &len,&x,&y,&w,&h))
	{ 
		neadnew = true; 
	}

	HDC hdc = GetDC(0);
	HBITMAP hBitmap;
	if (w == 0){
		w = GetSystemMetrics(SM_CXSCREEN);
		h = GetSystemMetrics(SM_CYSCREEN);
	}
		hBitmap = GetScreenBmp(hdc,x,y,w,h);

	BITMAPINFO MyBMInfo = { 0 };
	MyBMInfo.bmiHeader.biSize = sizeof(MyBMInfo.bmiHeader);

	// Get the BITMAPINFO structure from the bitmap
	if (0 == GetDIBits(hdc, hBitmap, 0, 0, NULL, &MyBMInfo, DIB_RGB_COLORS)) {
		return NULL;
	}

	// create the bitmap buffer
	if (len != MyBMInfo.bmiHeader.biSizeImage){
		len = MyBMInfo.bmiHeader.biSizeImage;
		neadnew = true;
	}
	if (neadnew)
		lpPixels = (BYTE*)malloc(len);

	// Better do this here - the original bitmap might have BI_BITFILEDS, which makes it
	// necessary to read the color table - you might not want this.
	MyBMInfo.bmiHeader.biCompression = BI_RGB;

	// get the actual bitmap buffer
	if (0 == GetDIBits(hdc, hBitmap, 0, MyBMInfo.bmiHeader.biHeight, (LPVOID)lpPixels, &MyBMInfo, DIB_RGB_COLORS)) {
		return NULL;
	}

	DeleteObject(hBitmap);
	ReleaseDC(NULL, hdc);
	return Py_BuildValue("s#", lpPixels, len);
}

static PyObject *spam_system2(PyObject *self, PyObject *args)
{
	BYTE* buf;
	int len = 5;
	BYTE* lpPixels;
	bool neadnew = false;
	int x = 0, y = 0, w = 0, h = 0;
	int len2;
	if (!PyArg_ParseTuple(args, "s#|(ii)(ii)", &lpPixels, &len, &x, &y, &w, &h))
	{
		neadnew = true;
	}
	
	HDC hdc = GetDC(0);
	HBITMAP hBitmap;
	if (w == 0){
		w = GetSystemMetrics(SM_CXSCREEN);
		h = GetSystemMetrics(SM_CYSCREEN);
	}

	hBitmap = GetScreenBmp(hdc, x, y, w, h);
	BITMAPINFO MyBMInfo = { 0 };
	MyBMInfo.bmiHeader.biSize = sizeof(MyBMInfo.bmiHeader);

	// Get the BITMAPINFO structure from the bitmap
	if (0 == GetDIBits(hdc, hBitmap, 0, 0, NULL, &MyBMInfo, DIB_RGB_COLORS)) {
		return NULL;
	}

	// create the bitmap buffer
	if (len != MyBMInfo.bmiHeader.biSizeImage){
		len = MyBMInfo.bmiHeader.biSizeImage;
		neadnew = true;
	}
	len2 = len >> 2;
	if (neadnew){
		lpPixels = (BYTE*)malloc(len2);
	}
	buf = (BYTE*)malloc(len);
	// Better do this here - the original bitmap might have BI_BITFILEDS, which makes it
	// necessary to read the color table - you might not want this.
	MyBMInfo.bmiHeader.biCompression = BI_RGB;

	// get the actual bitmap buffer
	if (0 == GetDIBits(hdc, hBitmap, 0, MyBMInfo.bmiHeader.biHeight, (LPVOID)buf, &MyBMInfo, DIB_RGB_COLORS)) {
		return NULL;
	}

	DeleteObject(hBitmap);
	ReleaseDC(NULL, hdc);
		int wi = 0;
		int w2 = w * 2;
		int w4 = w * 4;
		int hi = 0;

		int adding = 0;
		for (int i = 0; i < len2; ++i){
			lpPixels[i] = buf[i+adding];
			if (++hi == 4) {
				adding += 4;
				hi = 0;
			}
			if (++wi == w2)
			{
				adding += w4; 
				wi = 0; 
			}
		}
		/*for (int i = 0; i < wi; ++i)
		for (int j = 0; j < hi; j++){
			lpPixels[i * 4 + j*wi * 4] = buf[i*8+ j*w * 8];
			lpPixels[i * 4 + 1 + j*wi * 4] = buf[i*8+ 1 + j*w * 8];
			lpPixels[i * 4 + 2 + j*wi * 4] = buf[i*8 + 2 + j*w * 8];
			lpPixels[i * 4 + 3 + j*wi * 4] = buf[i*8 + 3 + j*w * 8];
		}*/
		free((void*)buf);
		return Py_BuildValue("s#", lpPixels, len2);
	}





PyMethodDef GrabscreeanMethods[] =
{
	{ "run", (PyCFunction)spam_system ,METH_VARARGS,0},
	{ "run2", (PyCFunction)spam_system2, METH_VARARGS, 0 },
	{ 0, 0, 0, 0 }
};

PyMODINIT_FUNC

initgrabscreean(void)
{
	PyObject *m;

	m = Py_InitModule("grabscreean", GrabscreeanMethods);
	if (m == NULL)
		return;
}