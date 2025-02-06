import "@/asset/css/plugins.bundle.css"
import "@/asset/css/style.bundle.css"


import "@/asset/css/all.css"
import "@/asset/css/brands.css"
import "@/asset/css/fontawesome.css"
import "@/asset/css/fonts.css"
import "@/asset/css/regular.css"
import "@/asset/css/solid.css"
import 'react-toastify/dist/ReactToastify.css';


import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify"



function MyApp({ Component, pageProps }) {


    const { pathname } = useRouter()
    const [toggle, settoggle] = useState(null)
    useEffect(() => {
        document.body.setAttribute("data-kt-app-layout", "dark-sidebar")
        document.body.setAttribute("data-kt-app-header-fixed", "true")
        document.body.setAttribute("data-kt-app-sidebar-enabled", "true")
        document.body.setAttribute("data-kt-app-sidebar-fixed", "true")
        document.body.setAttribute("data-kt-app-sidebar-hoverable", "true")
        document.body.setAttribute("data-kt-app-sidebar-push-header", "true")
        document.body.setAttribute("data-kt-app-sidebar-push-toolbar", "true")
        document.body.setAttribute("data-kt-app-sidebar-push-footer", "true")
        document.body.setAttribute("data-kt-app-toolbar-enabled", "true")
        document.body.setAttribute("class", "app-default")
        document.documentElement.setAttribute("data-bs-theme", "light");
    }, [])




    return (
        <div className="d-flex flex-column flex-root app-root">
            <div className="app-page flex-column flex-column-fluid">

                {/* Header */}
                <div className="app-header shadow-sm bg-white">
                    <div className="app-container container-fluid d-flex align-items-stretch justify-content-between">
                        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" >
                            <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
                                <div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0">
                                    <div className="menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2">
                                        <span className="menu-link">
                                            <span className="menu-title">Dashboards</span>
                                            <span className="menu-arrow d-lg-none"></span>
                                        </span>
                                        <div className="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0 w-100 w-lg-850px">
                                            <div className="menu-state-bg menu-extended overflow-hidden overflow-lg-visible">
                                                <div className="row">
                                                    <div className="col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6">
                                                        <div className="row">
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="index.html" className="menu-link active">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-element-11 text-primary fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Default</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Reports & statistics</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/ecommerce.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-basket text-danger fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">eCommerce</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Sales reports</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/projects.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-abstract-44 text-info fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Projects</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Tasts, graphs & charts</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/online-courses.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-color-swatch text-success fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                                <span className="path5"></span>
                                                                                <span className="path6"></span>
                                                                                <span className="path7"></span>
                                                                                <span className="path8"></span>
                                                                                <span className="path9"></span>
                                                                                <span className="path10"></span>
                                                                                <span className="path11"></span>
                                                                                <span className="path12"></span>
                                                                                <span className="path13"></span>
                                                                                <span className="path14"></span>
                                                                                <span className="path15"></span>
                                                                                <span className="path16"></span>
                                                                                <span className="path17"></span>
                                                                                <span className="path18"></span>
                                                                                <span className="path19"></span>
                                                                                <span className="path20"></span>
                                                                                <span className="path21"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Online Courses</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Student progress</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/marketing.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-chart-simple text-gray-900 fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Marketing</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Campaings & conversions</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/bidding.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-switch text-warning fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Bidding</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Campaings & conversions</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/pos.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-abstract-42 text-danger fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">POS System</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Campaings & conversions</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <div className="menu-item p-0 m-0">
                                                                    <a href="dashboards/call-center.html" className="menu-link">
                                                                        <span className="menu-custom-icon d-flex flex-center flex-shrink-0 rounded w-40px h-40px me-3">
                                                                            <i className="ki-duotone ki-call text-primary fs-1">
                                                                                <span className="path1"></span>
                                                                                <span className="path2"></span>
                                                                                <span className="path3"></span>
                                                                                <span className="path4"></span>
                                                                                <span className="path5"></span>
                                                                                <span className="path6"></span>
                                                                                <span className="path7"></span>
                                                                                <span className="path8"></span>
                                                                            </i>
                                                                        </span>
                                                                        <span className="d-flex flex-column">
                                                                            <span className="fs-6 fw-bold text-gray-800">Call Center</span>
                                                                            <span className="fs-7 fw-semibold text-muted">Campaings & conversions</span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="separator separator-dashed mx-5 my-5"></div>
                                                        <div className="d-flex flex-stack flex-wrap flex-lg-nowrap gap-2 mx-5">
                                                            <div className="d-flex flex-column me-5">
                                                                <div className="fs-6 fw-bold text-gray-800">Landing Page Template</div>
                                                                <div className="fs-7 fw-semibold text-muted">Onpe page landing template with pricing & others</div>
                                                            </div>
                                                            <a href="landing.html" className="btn btn-sm btn-primary fw-bold">Explore</a>
                                                        </div>
                                                    </div>
                                                    <div className="menu-more bg-light col-lg-4 py-3 px-3 py-lg-6 px-lg-6 rounded-end">
                                                        <h4 className="fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4">More Dashboards</h4>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/logistics.html" className="menu-link py-2">
                                                                <span className="menu-title">Logistics</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/website-analytics.html" className="menu-link py-2">
                                                                <span className="menu-title">Website Analytics</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/finance-performance.html" className="menu-link py-2">
                                                                <span className="menu-title">Finance Performance</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/store-analytics.html" className="menu-link py-2">
                                                                <span className="menu-title">Store Analytics</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/social.html" className="menu-link py-2">
                                                                <span className="menu-title">Social</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/delivery.html" className="menu-link py-2">
                                                                <span className="menu-title">Delivery</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/crypto.html" className="menu-link py-2">
                                                                <span className="menu-title">Crypto</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">
                                                            <a href="dashboards/school.html" className="menu-link py-2">
                                                                <span className="menu-title">School</span>
                                                            </a>
                                                        </div>
                                                        <div className="menu-item p-0 m-0">

                                                            <a href="dashboards/podcast.html" className="menu-link py-2">
                                                                <span className="menu-title">Podcast</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="app-wrapper flex-column flex-row-fluid">

                    {/* Sidebar */}
                    <div className="app-sidebar flex-column" >
                        <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
                            <a href="/">
                                <img alt="Logo" src="assets/media/logos/default-dark.svg" className="h-25px app-sidebar-logo-default" />
                                <img alt="Logo" src="assets/media/logos/default-small.svg" className="h-20px app-sidebar-logo-minimize" />
                            </a>
                            <div className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="app-sidebar-minimize">
                                <i className="ki-duotone ki-black-left-line fs-3 rotate-180">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                        <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                            <div className="app-sidebar-wrapper">
                                <div className="scroll-y my-5 mx-3" style={{ height: "85vh" }}>
                                    <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6">

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/" ? "active" : ""}`} href="/">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-rocket fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Panel</span>
                                            </Link>
                                        </div>

                                        {/* Haber */}
                                        <div className="menu-item pt-5">
                                            <div className="menu-content">
                                                <span className="menu-heading fw-bold text-uppercase fs-7">Haber</span>
                                            </div>
                                        </div>

                                        <div className={`menu-item menu-accordion 
                                ${toggle === 1 ||
                                                pathname === "/news/news.new" ||
                                                pathname === "/news/news.list" ||
                                                pathname === "/news/news.category"
                                                ? "show" : ""
                                            }`}>
                                            <span className="menu-link" onClick={() => { settoggle((old) => (old === 1 ? null : 1)); }}>
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-message-text-2 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Haber Yönetimi</span>
                                                <span className="menu-arrow"></span>
                                            </span>

                                            <div className={`menu-sub menu-sub-accordion 
                                        ${toggle === 1 ||
                                                    pathname === "/news/news.new" ||
                                                    pathname === "/news/news.list" ||
                                                    pathname === "/news/news.category"
                                                    ? "show" : ""
                                                }`}>
                                                <div className="menu-item">
                                                    <Link className={`menu-link ${pathname === "/news/news.new" ? "active" : ""}`} href="/haberler/yeni">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Yeni</span>
                                                    </Link>
                                                </div>
                                                <div className="menu-item">
                                                    <Link className={`menu-link ${pathname === "/news/news.list" ? "active" : ""}`} href="/haberler/liste">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Liste</span>
                                                    </Link>
                                                </div>
                                                <div className="menu-item">
                                                    <Link className={`menu-link ${pathname === "/news/news.category" ? "active" : ""}`} href="/haberler/kategori">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Kategori</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/news/news.analitics" ? "active" : ""}`} href="/haberler/analizler">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Analiz</span>
                                            </Link>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/news/news.comment" ? "active" : ""}`} href="/haberler/yorumlar">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Yorumlar</span>
                                            </Link>
                                        </div>

                                        {/* Reklam Yönetimi */}
                                        <div className="menu-item pt-5">
                                            <div className="menu-content">
                                                <span className="menu-heading fw-bold text-uppercase fs-7">Reklam Yönetimi</span>
                                            </div>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/advert/ad.placement" ? "active" : ""}`} href="/reklam/yerlesim">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Reklam Yerleşimi</span>
                                            </Link>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/advert/ad.popup" ? "active" : ""}`} href="/reklam/popup">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Popup</span>
                                            </Link>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/advert/ad.social.media" ? "active" : ""}`} href="/reklam/sosyal-medya">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Sosyal Medya</span>
                                            </Link>
                                        </div>

                                        {/* Ayarlar */}
                                        <div className="menu-item pt-5">
                                            <div className="menu-content">
                                                <span className="menu-heading fw-bold text-uppercase fs-7">Ayarlar</span>
                                            </div>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/settings/sett.member" ? "active" : ""}`} href="/ayarlar/aboneler">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Aboneler</span>
                                            </Link>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/settings/sett.email" ? "active" : ""}`} href="/ayarlar/e-postalar">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">E-postalar</span>
                                            </Link>
                                        </div>

                                        <div className="menu-item">
                                            <Link className={`menu-link ${pathname === "/settings/sett.mailchimp" ? "active" : ""}`} href="/ayarlar/mailchimp">
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-calendar-8 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                        <span className="path4"></span>
                                                        <span className="path5"></span>
                                                        <span className="path6"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Mailchimp</span>
                                            </Link>
                                        </div>

                                        <div className={`menu-item menu-accordion 
                                ${toggle === 2 ||
                                                pathname === "/settings/sett.users" ||
                                                pathname === "/settings/sett.settings"
                                                ? "show" : ""
                                            }`}>
                                            <span className="menu-link" onClick={() => { settoggle((old) => (old === 2 ? null : 2)); }}>
                                                <span className="menu-icon">
                                                    <i className="ki-duotone ki-message-text-2 fs-2">
                                                        <span className="path1"></span>
                                                        <span className="path2"></span>
                                                        <span className="path3"></span>
                                                    </i>
                                                </span>
                                                <span className="menu-title">Site Yönetimi</span>
                                                <span className="menu-arrow"></span>
                                            </span>
                                            <div className={`menu-sub menu-sub-accordion 
                                        ${toggle === 2 ||
                                                    pathname === "/settings/sett.users" ||
                                                    pathname === "/settings/sett.management"
                                                    ? "show" : ""
                                                }`}>
                                                <div className="menu-item">
                                                    <Link className={`menu-link ${pathname === "/settings/sett.users" ? "active" : ""}`} href="/ayarlar/kullanicilar">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Kullanıcılar</span>
                                                    </Link>
                                                </div>
                                                <div className="menu-item">
                                                    <Link className={`menu-link ${pathname === "/settings/sett.management" ? "active" : ""}`} href="/ayarlar/yonetim">
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span className="menu-title">Ayarlar</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="app-main flex-column flex-row-fluid">
                        <div className="d-flex flex-column flex-column-fluid">
                            <div className="app-toolbar py-3 py-lg-6 container p-0">
                                <div className="app-container container-fluid d-flex flex-stack">
                                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">{pageProps.title}</h1>
                                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                                            <li className="breadcrumb-item text-muted">
                                                <a href="" className="text-muted text-hover-primary">Pusula Swiss</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <span className="bullet bg-gray-500 w-5px h-2px"></span>
                                            </li>
                                            <li className="breadcrumb-item text-muted">{pageProps.path}</li>
                                        </ul>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                                        <div dangerouslySetInnerHTML={{ __html: pageProps.content }} />
                                    </div>
                                </div>
                            </div>
                            <div className="app-content flex-column-fluid">
                                <div className="app-container container">
                                    <Component {...pageProps} />
                                    <div className="h-100px"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default MyApp;