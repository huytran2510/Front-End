import React from 'react';
import "../../css/footer.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    // @ts-ignore
    return (
        <footer className="footer bottom-0">
            <div className="row d-flex flex-row align-items-center justify-content-center">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 footer_col">
                    <div className="hotline_footer">
                        <p><img
                            src="https://file.hstatic.net/1000075078/file/phone_0a42df1c753c4fa0910108daa73fe2ef.png"/>Đặt
                            hàng: 1800 6936</p>
                        <p><img
                            src="https://file.hstatic.net/1000075078/file/map-pin-2-line_575ccb91b6f94a308d1bd507d4ae72a7.png"/>Liên
                            hệ</p>
                    </div>
                    <div className="address_footer">
                        <p> 67 Đinh Bộ Lĩnh, P.26,<br/> Q.Bình Thạnh, TP.Hồ Chí Minh</p></div>
                </div>
                <div
                    className="col-lg-3 col-md-3 col-sm-6 col-xs-12 col-lg-push-6 col-md-push-6 footer_col footer_right">
                    <div className="tch_page">
                        <div className="fb-page fb_iframe_widget"
                             data-href="https://www.facebook.com/The.Coffee.House.2014/" data-small-header="false"
                             data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"
                             fb-xfbml-state="rendered"
                             fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=363772567412181&amp;container_width=270&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FThe.Coffee.House.2014%2F&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false">
                            <span style={{verticalAlign:"bottom", width:"270px",height:"130px"}}>
                                <iframe
                                name="fa5a95a8e904d9fe7" width="1000px" height="1000px"
                                data-testid="fb:page Facebook Social Plugin" title="fb:page Facebook Social Plugin"
                                frameBorder="0" allowTransparency="true" allowFullScreen="true" scrolling="no"
                                allow="encrypted-media"
                                src="https://www.facebook.com/v2.0/plugins/page.php?adapt_container_width=true&amp;app_id=363772567412181&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfc7fac53a2f0eaddf%26domain%3Dthecoffeehouse.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fthecoffeehouse.com%252Ffe609d1bc14a9866c%26relation%3Dparent.parent&amp;container_width=270&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FThe.Coffee.House.2014%2F&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false"
                                style={{border: "none", visibility: "visible", width: "270px", height: "130px"}}
                                className=""></iframe></span></div>
                    </div>

                    <ul className="tch_social_links">
                        <li>
                            <a href="https://www.facebook.com/The.Coffee.House.2014/">
                                <img
                                    src="https://file.hstatic.net/1000075078/file/test_fd4e30831d14438f9d0f1fcf255dfadb.svg"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/thecoffeehousevn/">
                                <img
                                    src="https://file.hstatic.net/1000075078/file/test_db37bb3840ac45f3a0a3cf7aa8a57d9e.svg"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-lg-pull-6 col-md-pull-6 footer_col">
                    <h3 className="footer_title">Giới thiệu</h3>
                    <ul className="footer_linklists">
                        <li><a href="/pages/chuyen-ca-phe-va-tra" title="Về Chúng Tôi">Về Chúng Tôi</a></li>
                        <li><a href="/" title="Sản phẩm">Sản phẩm</a></li>
                        <li><a href="/" title="Khuyến mãi">Khuyến mãi</a></li>
                        <li><a href="/pages/hat-ca-phe-the-coffee-house" title="Chuyện cà phê">Chuyện cà phê</a></li>
                        <li><a href="/pages/menu" title="Cửa Hàng">Cửa Hàng</a></li>
                        <li><a href="http://tuyendung.thecoffeehouse.com/" title="Tuyển dụng">Tuyển dụng</a></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 col-lg-pull-6 col-md-pull-6 footer_col">
                    <h3 className="footer_title">Điều khoản</h3>
                    <ul className="footer_linklists">
                        <li><a href="/pages/dieu-khoan-su-dung" title="Điều khoản sử dụng">Điều khoản sử dụng</a></li>
                        <li><a href="/pages/chinh-sach-bao-mat-thong-tin" title="Chính sách bảo mật thông tin">Chính
                            sách bảo mật thông tin</a></li>
                        <li><a href="/pages/huong-dan-xuat-hoa-don-gtgt" title="Hướng dẫn xuất hóa đơn GTGT">Hướng dẫn
                            xuất hóa đơn GTGT</a></li>
                    </ul>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footer_col">
                    <hr/>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 footer_col">
                    <ul className="footer_itemlists">
                        <li>Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN</li>
                        <li>Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày 23/07/2014. Người đại diện: NGÔ NGUYÊN KHA</li>
                        <li>Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp Hồ Chí Minh &nbsp; Điện thoại: (028) 7107 8079 &nbsp; Email: hi@thecoffeehouse.vn</li>
                        <li>© 2014-2022 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN mọi quyền bảo lưu</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

// const footerStyle = {
//     padding: '1.5rem',
//     backgroundColor:
//         '#333',
//     color:
//         '#fff',
//     textAlign:
//         'center',
//     // position: 'fixed',
//     // bottom: 0,
//     width:
//         '100%',
//     lineHeight:
//         '1.6',
// };

// const linkStyle = {
//     color: '#fff',
//         textDecoration
// :
//     'none',
// };

export default Footer;