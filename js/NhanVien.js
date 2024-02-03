function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam,
  _loaiNhanVien
) {
  this.tknv = _taiKhoan;
  this.name = _hoTen;
  this.email = _email;
  this.password = _matKhau;
  this.datepicker = _ngayLam;
  this.luongCB = _luongCoBan;
  this.chucvu = _chucVu;
  this.gioLam = _gioLam;
  this.loaiNhanVien = _loaiNhanVien;
  this.tinhTongLuong = function () {
    var tongLuong;
    if (this.chucvu == "BOSS") {
      tongLuong = this.luongCB * 1 * 3;
    } else if (this.chucvu == "TP") {
      tongLuong = this.luongCB * 1 * 2;
    } else if (this.chucvu == "NV") {
      tongLuong = this.luongCB * 1 * 1;
    } else {
      tongLuong = this.luongCB * 1;
    }
    return tongLuong;
  };
  this.xepLoai = function () {
    var xepLoaiNV;
    if (this.gioLam * 1 >= 192) {
      xepLoaiNV = "Xuất xắc";
    } else if (this.gioLam * 1 >= 176) {
      xepLoaiNV = "Giỏi";
    } else if (this.gioLam * 1 >= 160) {
      xepLoaiNV = "Khá";
    } else {
      xepLoaiNV = "Trung bình";
    }
    return xepLoaiNV;
  };
}
