import { Flex } from "@/module/module";
import { useRouter } from "next/router";
import { useState } from "react";






function Index() {
    const { query } = useRouter();
    const [Tabs, setTabs] = useState<any>(1)
    const [Drawer, setDrawer] = useState("")


    const [ShortTitle, setShortTitle] = useState<string>("")
    const [Title, setTitle] = useState<string>("")
    const [ShortText, setShortText] = useState<string>("")
    const [Text, setText] = useState<string>("")

    const [SeoTitle, setSeoTitle] = useState<string>("")
    const [SeoText, setSeoText] = useState<string>("")
    const [SeoKeyword, setSeoKeyword] = useState<string>("")

    const [ExtraGalery, setExtraGalery] = useState<string>("")
    const [ExtraVideo, setExtraVideo] = useState<string>("")
    const [ExtraPodcast, setExtraPodcast] = useState<string>("")
    const [ExtraEvent, setExtraEvent] = useState<string>("")

    const [Image, setImage] = useState<string>("")
    const [Author, setAuthor] = useState<string>("")
    const [Category, setCategory] = useState<string>("")

    const [FeaturedPost, setFeaturedPost] = useState<boolean>(false)
    const [FeaturedDate, setFeaturedDate] = useState<string>("")

    const [PlannerDate, setPlannerDate] = useState<string>("")
    const [PlannerTime, setPlannerTime] = useState<string>("")


    return (
        <>

            <div className="row">
                <div className="col-8">

                    {/* İçerik */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Haber İçerği</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-10">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Kısa Giriş Başlığı</label>
                                        <input className="form-control" placeholder="Kısa Giriş Başlığı" value={ShortTitle} onChange={(e: any) => { setShortTitle(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Başlık</label>
                                        <input className="form-control" placeholder="Başlık" value={Title} onChange={(e: any) => { setTitle(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Kısa Açıklaması</label>
                                        <textarea className="form-control" placeholder="Kısa Açıklama" rows={5} value={ShortText} onChange={(e: any) => { setShortText(e.target.value) }}></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Haber İçeriği</label>
                                        <Flex.Editor style={{ height: "800" }} value={Text} onChange={(e: any) => { setText(e) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seo */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Seo İçerği</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="alert alert-primary d-flex align-items-center p-5">
                                    <i className="ki-duotone ki-shield-tick fs-2hx text-info me-4">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    <div className="d-flex flex-column">
                                        <h4 className="mb-1 text-dark">Seo Hakkında</h4>
                                        <span className="mb-2">
                                            Seo hakkında daha fazla detay için <b className="text-info cursor-pointer" onClick={() => { setDrawer("seo-example") }}>Tıklayın</b>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-3 mb-5">
                                    <button className="btn btn-info h-35px p-3 d-flex align-items-center">
                                        <i className="fa-solid fa-microchip fs-2"></i>
                                        <div className="ms-0 me-2 fs-7">Seo Oluştur</div>
                                    </button>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Seo Başlığı</label>
                                        <input className="form-control" placeholder="haber Başlığı" value={SeoTitle} onChange={(e: any) => { setSeoTitle(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Kısa Açıklaması</label>
                                        <textarea className="form-control" placeholder="Haber Kısa Açıklama" rows={5} value={SeoText} onChange={(e: any) => { setSeoText(e.target.value) }} ></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <label className="form-label mb-1 fs-7">Anahtar Kelimeler</label>
                                        <Flex.Tagger value={SeoKeyword} onChange={(e: any) => { setSeoKeyword(e) }} placeholder={"Anahtar kelime girin ve Enter'a basın"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Diğer */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Ek İçerikler</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <div className="alert alert-primary d-flex align-items-center p-5 mt-2">
                                        <i className="ki-duotone ki-shield-tick fs-2hx text-info me-4">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h4 className="mb-1 text-dark fs-5">Ek İçerikler Hakkında</h4>
                                            <span>
                                                Haber içeriğine, <b>Galeri</b>, <b>Video</b>, <b>Podcast(Ses Dosyaları)</b> ve <b>Etkinlik</b> gibi içerikler eklemek istediğinizde kullanabilirsiz
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="d-flex">
                                        <div className={`min-w-125px h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 1 ? "bg-info" : ""}`} onClick={() => { setTabs(1) }}>
                                            <i className={`fa-regular fa-image me-2 ${Tabs === 1 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 1 ? "text-white" : ""}`}>Galeri</div>
                                        </div>
                                        <div className={`min-w-125px h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 2 ? "bg-info" : ""}`} onClick={() => { setTabs(2) }}>
                                            <i className={`fa-solid fa-video me-2 ${Tabs === 2 ? " text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 2 ? " text-white" : ""}`}>Video</div>
                                        </div>
                                        <div className={`min-w-125px h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 3 ? "bg-info" : ""}`} onClick={() => { setTabs(3) }}>
                                            <i className={`fa-solid fa-microphone-lines me-2 ${Tabs === 3 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 3 ? "text-white" : ""}`}>Podcast</div>
                                        </div>
                                        <div className={`min-w-125px h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 4 ? "bg-info" : ""}`} onClick={() => { setTabs(4) }}>
                                            <i className={`fa-solid fa-map-pin me-2 ${Tabs === 4 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 4 ? "text-white" : ""}`}>Etkinlik</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" hidden={Tabs === 1 ? false : true}>
                                    <Flex.Upload.Multiple />
                                </div>
                                <div className="col-12" hidden={Tabs === 2 ? false : true}>
                                    <Flex.Youtuber />
                                </div>
                                <div className="col-12" hidden={Tabs === 3 ? false : true}>
                                    <Flex.VoicePodcast />
                                </div>
                                <div className="col-12" hidden={Tabs === 4 ? false : true}>
                                    <Flex.Eventer />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-4">

                    {/* Ön İzleme */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Ön İzleme Resmi</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="col-12 mb-5">
                                <Flex.Upload.Single
                                    value={Image}
                                    placeholder="Haber Görseli Seçin"
                                    onChange={(e: any) => { setImage(e) }}
                                    permissions={{
                                        maxWidth: 1024,
                                        maxHeight: 576,
                                        situation: "equals"
                                    }}
                                />
                            </div>
                        </div>



                    </div>

                    {/* Yazar */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Yazar</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="col-12 mb-5">
                                <Flex.Select.Multiple
                                    data={[
                                        { id: 1, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                    ]}
                                    settings={{
                                        conteinerClass: "h-auto"
                                    }}
                                    value={Author}
                                    onChange={(e: any) => { setAuthor(e) }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Kategori */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Kategori</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="col-12 mb-5">
                                <Flex.Select.Multiple
                                    data={[
                                        { id: 1, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                        { id: 2, name: "Pusula Swiss" },
                                    ]}
                                    settings={{
                                        conteinerClass: "h-auto"
                                    }}
                                    value={Author}
                                    onChange={(e: any) => { setCategory(e) }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Öne Çıkar */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Öne Çıkar</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                <div className="col-12 mb-5">
                                    <div className="alert alert-primary d-flex align-items-center p-5">
                                        <i className="ki-duotone ki-shield-tick fs-2hx text-info me-4">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                        </i>
                                        <div className="d-flex flex-column">
                                            <h4 className="mb-1 text-dark">Öne Çıkarma Hakkında</h4>
                                            <span className="mb-2">
                                                Haberinizi belirli bir kategoride ilk sırada görünmesini sağlayabilrisiniz.İsterseniz haberinize öne çıkan görsel belirleyebilirsiniz.
                                            </span>
                                        </div>
                                    </div>
                                </div>



                                <div className="col-12 mb-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="post_featured" checked={FeaturedPost} onChange={(e: any) => { setFeaturedPost(e.target.checked) }} />
                                        <label className="form-check-label" htmlFor="post_featured">Haberi Öne Çıkar</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-5" hidden={FeaturedPost ? false : true}>
                                    <Flex.Upload.Single
                                        value={Image}
                                        placeholder="Haber Görseli Seçin"
                                        onChange={(e: any) => { setImage(e) }}
                                        permissions={{
                                            maxWidth: 1024,
                                            maxHeight: 576,
                                            situation: "equals"
                                        }}
                                    />
                                </div>

                                <div className="col-12 mb-5" hidden={FeaturedPost ? false : true}>
                                    <label className="form-label mb-1 fs-6 text-gray-600 fw-semibold">Berlirli bir tarihe kadar öne çıkart</label>
                                    <div className="d-flex">
                                        <div className="w-100 me-1">
                                            <input className="form-control" placeholder="05.02.2024" value={FeaturedDate} onChange={(e: any) => { setFeaturedDate(e.target.checked) }} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    {/* Planlayıcı */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Planlayıcı</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body">
                            <div className="col-12 mb-2">
                                <div className="alert alert-primary d-flex align-items-center p-5 mt-2">
                                    <i className="ki-duotone ki-shield-tick fs-2hx text-info me-4">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                    </i>
                                    <div className="d-flex flex-column">
                                        <h4 className="mb-1 text-dark fs-5">Planlayıcı Nedir</h4>
                                        <span>
                                            Haberinizin yayınlanmasını istediğiniz tarih ve saati seçebilirsiniz.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-5">
                                <Flex.Planner

                                />

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">

                    <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off" hidden={query.id ? true : false}>
                        <span className="indicator-label">
                            <i className="fa-solid fa-paper-plane me-1"></i>
                            Yayınla
                        </span>
                        <span className="indicator-progress">
                            İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>

                    <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off" hidden={query.id ? false : true}>
                        <span className="indicator-label">
                            <i className="fa-solid fa-paper-plane me-1"></i>
                            Güncelle
                        </span>
                        <span className="indicator-progress">
                            İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>

                    <button type="button" className="btn btn-secondary btn-sm me-5 border border-gray-300" data-kt-indicator="off">
                        <span className="indicator-label">
                            <i className="fa-solid fa-box-archive me-1"></i>
                            Taslak
                        </span>
                        <span className="indicator-progress">
                            İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>

                    <button type="button" className="btn btn-secondary btn-sm border border-gray-300" data-kt-indicator="off">
                        <span className="indicator-label">
                            <i className="fa-solid fa-eye me-1"></i>
                            Ön İzleme
                        </span>
                        <span className="indicator-progress">
                            İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>

                </div>
            </div>


            <div className={`bg-white drawer drawer-end ${Drawer === "seo-example" ? "drawer-on" : ""}`} style={{ width: "600px" }}>
                <div className="card w-100 rounded-0">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <a href="#" className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Seo Optimizasyonu</a>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary">
                                <i className="ki-duotone ki-cross fs-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body hover-scroll-overlay-y">
                        <div className="mb-2 alert alert-info">
                            <div className="mb-5">
                                <div className="fw-bolder me-1 fs-4">Anahtar Kelime Sıklığı (Keyword Frequency)</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Tanım:</b></div>
                                <div className="fs-5 lh-sm">Bir anahtar kelimenin sayfadaki toplam tekrar edilme sayısını ifade eder.</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Örnek:</b></div>
                                <div className="fs-5 lh-sm fw-bold text-dark">
                                    "SEO hakkında bilgi almak için SEO rehberimize göz atın. SEO stratejileri hakkında detaylı bilgi bulabilirsiniz."
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Sonuç:</b></div>
                                <div className="fs-5 lh-sm"> "SEO" kelimesinin sıklığı: 3</div>
                            </div>
                        </div>


                        <div className="mb-2 alert alert-info">
                            <div className="mb-1">
                                <div className="fw-bolder me-1 fs-4">Anahtar Kelime Yoğunluğu (Keyword Density)</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Tanım:</b></div>
                                <div className="fs-5 lh-sm">Anahtar kelimenin, metindeki toplam kelime sayısına oranıdır.</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Örnek:</b></div>
                                <div className="fs-5 lh-sm fw-semibold">
                                    "SEO, web siteleri için önemlidir. SEO kurallarına uygun içerik oluşturmak gerekir."
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>Sonuç:</b></div>
                                <div className="fs-5 lh-sm">(Toplam kelime sayısı: 12) <br /> "SEO" kelimesinin yoğunluğu: (2 / 12) × 100 = 16.67%</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-7 lh-sm"><b>İdeal yoğunluk:</b></div>
                                <div className="fs-5 lh-sm">%1-3 arasında olmalıdır. Fazla kullanımı "keyword stuffing" olarak değerlendirilir ve cezaya neden olabilir.</div>
                            </div>
                        </div>


                        <div className="mb-3 alert alert-info">
                            <div className="mb-5">
                                <div className="fw-bolder me-1 fs-4">Anahtar Kelime Önemi (Keyword Prominence)</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Tanım:</b></div>
                                <div className="fs-5 lh-sm">
                                    Anahtar kelimenin içeriğin başında, başlıkta veya alt başlıklarda bulunup bulunmadığını ifade eder.
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>İyi Örnek:</b></div>
                                <div className="fs-5 lh-sm fw-semibold">
                                    "Bu yazımızda nasıl blog yazacağınızı öğreneceksiniz. SEO çok önemlidir."
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Kötü Örnek:</b></div>
                                <div className="fs-5 lh-sm fw-semibold">
                                    "SEO: Blog Yazılarınızı Google’da Üst Sıraya Çıkarmak İçin İpuçları"
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Neden önemli:</b></div>
                                <div className="fs-5 lh-sm">
                                    Arama motorları, anahtar kelimenin içeriğin ilk 100 kelimesinde veya başlıklarda yer almasını daha değerli görür.
                                </div>
                            </div>
                        </div>

                        <div className="mb-10 alert alert-info">
                            <div className="mb-5">
                                <div className="fw-bolder me-1 fs-4">Anahtar Kelime Yakınlığı (Keyword Proximity)</div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Tanım:</b></div>
                                <div className="fs-5 lh-sm">
                                    Anahtar kelimenin içeriğin başında, başlıkta veya alt başlıklarda bulunup bulunmadığını ifade eder.
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Zayıf yakınlık:</b></div>
                                <div className="fs-5 lh-sm fw-semibold">
                                    "Google sıralamalarında üst sıralarda çıkmak için içerik stratejinizi optimize etmelisiniz. SEO tekniklerini kullanarak başarı sağlayabilirsiniz."
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Güçlü yakınlık:</b></div>
                                <div className="fs-5 lh-sm fw-semibold">
                                    "SEO tekniklerini kullanarak Google sıralamalarında yükselin."
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="fs-5 lh-sm"><b>Neden önemli:</b></div>
                                <div className="fs-5 lh-sm">
                                    Anahtar kelimenin bölünmeden bir arada kullanılması, arama motorlarının içeriği daha iyi anlamasına yardımcı olur.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-overlay" onClick={() => { setDrawer("") }} style={{ zIndex: 109, display: Drawer === "seo-example" ? "block" : "none" }}></div>

        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            title: "asd",
            path: "sdfsdf",

        },
    };
}
export default Index;