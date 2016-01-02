def write_png(buf, width, height):
    """ buf: must be bytes or a bytearray in py3, a regular string in py2. formatted RGBARGBA... """
    import zlib, struct

    # reverse the vertical line order and add null bytes at the start
    buf1=b''.join(b''+ buf[i+2]+buf[i+1]+buf[i]+buf[i+3] for i in xrange(0,len(buf),4))
    
    width_byte_4 = width * 4
    raw_data = b''.join(b'\x00' + buf1[span:span + width_byte_4]
                        for span in range((height - 1) * width * 4, -1, - width_byte_4))

    def png_pack(png_tag, data):
        chunk_head = png_tag + data
        return (struct.pack("!I", len(data)) +
                chunk_head +
                struct.pack("!I", 0xFFFFFFFF & zlib.crc32(chunk_head)))

    return b''.join([
        b'\x89PNG\r\n\x1a\n',
        png_pack(b'IHDR', struct.pack("!2I5B", width, height, 8, 6, 0, 0, 0)),
        png_pack(b'IDAT', zlib.compress(raw_data, 9)),
        png_pack(b'IEND', b'')])
