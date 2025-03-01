import { Flex } from "@/module/module";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
    return {
        props: {
            title: "Yeni Haber",
            path: "Haber Ekle"
        },
    };
}

function Page() {
    const { query, push } = useRouter();
    const [Tabs, setTabs] = useState<any>(1)
    const [TabsSettings, setTabsSettings] = useState<any>(1)
    const [Drawer, setDrawer] = useState("")
    const [SectionTabs, setSectionTabs] = useState<any>({
        content: true,
        extra: false,
        settings: false,
        preview: false,
        author: false,
        category: false,
    })

    const AreaInfo = ({ t }: { t: any }) => {
        return (
            <>
                <div className="d-flex align-items-center mt-4">
                    <div className="me-1">
                        <i className="fa-solid fa-circle-info lh-sm fs-4"></i>
                    </div>
                    <div className="w-100">
                        <div className="fs-8 text-gray-500 fw-semibold">{t}</div>
                    </div>
                </div>
            </>
        )
    }
    const InputLabel = ({ t }: { t: any }) => {
        return (
            <>
                <label className="form-label mb-1 fs-6 text-gray-600 fw-bold">{t}</label>
            </>
        )
    }
    const SectionLabel = ({ t }: { t: any }) => {
        return (
            <>
                <div className="h-20px d-flex align-items-center p-4 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                    <div className="fs-6 fw-bold w-100">{t}</div>
                    <i className="fa-solid fa-angle-down fs-1"></i>
                </div>
            </>
        )
    }

    const [AuthorData, setAuthorData] = useState<any>([])
    useEffect(() => {
        const GetAuthors = async () => {
            const response = await axios.get("/api/authors/select")
            setAuthorData(response.data.data)
        }
        GetAuthors();
    }, [])
    const [CategoryData, setCategoryData] = useState<any>([])
    useEffect(() => {
        const GetCategory = async () => {
            const response = await axios.get("/api/news/category/select")
            setCategoryData(response.data.data)
        }
        GetCategory();
    }, [])

    const OnBack = () => {

        const params = new URLSearchParams(window.location.search);
        const p = params.get("p") ? params.get("p") : 1;
        const l = params.get("l") ? params.get("l") : 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        const i = params.get("i") ? params.get("i") : "";
        push(`/haberler/liste?p=${p}&l=${l}${s}&o=${o}&i=${i}`);
    }




    const [Short, setShort] = useState<string>("")
    const [Title, setTitle] = useState<string>("")
    const [Text, setText] = useState<string>("")
    const [Content, setContent] = useState<string>("")

    const [SeoTitle, setSeoTitle] = useState<string>("")
    const [SeoText, setSeoText] = useState<string>("")
    const [SeoKeyword, setSeoKeyword] = useState<string>("")

    const [Galery, setGalery] = useState<string>("")
    const [Video, setVideo] = useState<string>("")
    const [Podcast, setPodcast] = useState<string>("")
    const [Event, setEvent] = useState<string>("")

    const [Image, setImage] = useState<string>("")
    const [Author, setAuthor] = useState<number>(0)
    const [Category, setCategory] = useState<number>(0)



    const [FeaturedError, setFeaturedError] = useState<boolean>(false)
    useEffect(() => {
        setTimeout(() => {
            setFeaturedError(false)
        }, 3000);
    }, [FeaturedError])
    const [FeaturedContentStatus, setFeaturedContentStatus] = useState<boolean>(false)
    const [FeaturedImageStatus, setFeaturedImageStatus] = useState<boolean>(false)
    const [FeaturedDateStatus, setFeaturedDateStatus] = useState<boolean>(false)

    const [FeaturedImage, setFeaturedImage] = useState<string>("")
    const [FeaturedDate, setFeaturedDate] = useState<string>("")


    const [PlannerPost, setPlannerPost] = useState<boolean>(false)
    const [PlannerDate, setPlannerDate] = useState<string>("")
    const [PlannerTime, setPlannerTime] = useState<string>("")

    const InsertPost = () => {
        try {
            axios.post("/api/news/category/select", {
                Short: Short,
                Title: Title,
                Text: Text,
                Content: Content,
                SeoTitle: SeoTitle,
                SeoText: SeoText,
                SeoKeyword: SeoKeyword,
                Galery: Galery,
                Video: Video,
                Podcast: Podcast,
                Event: Event,
                Image: Image,
                Author: Author,
                Category: Category,
                FeaturedImage: FeaturedImage,
                FeaturedDate: FeaturedDate,
                PlannerPost: PlannerPost,
                PlannerDate: PlannerDate,
                PlannerTime: PlannerTime,
            })
                .then((result: any) => {

                }).catch((error: any) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const UpdatePost = () => {
        try {
            axios.get("/api/news/category/select")
                .then((result: any) => {

                }).catch((error: any) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className="row">
                <div className="col-8">

                    {/* İçerik */}
                    <div className="card mb-5">
                        <SectionLabel t={"Haber İçerği"} />
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Kısa Giriş Başlığı"} />
                                        <input className="form-control" placeholder="Kısa Giriş Başlığı" value={Short} onChange={(e: any) => { setShort(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Başlık"} />
                                        <input className="form-control" placeholder="Başlık" value={Title} onChange={(e: any) => { setTitle(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Kısa Açıklaması"} />
                                        <textarea className="form-control" placeholder="Kısa Açıklama" rows={5} value={Text} onChange={(e: any) => { setText(e.target.value) }}></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Haber İçeriği"} />
                                        <Flex.Editor style={{ height: "800" }} value={Content} onChange={(e: any) => { setContent(e) }} />
                                    </div>
                                </div>

                                <div className="col-12 mb-2">
                                    <div className="form-group">
                                        <InputLabel t={"Anahtar Kelimeler"} />
                                        <Flex.Tagger value={SeoKeyword} onChange={(e: any) => { setSeoKeyword(e) }} placeholder={"Anahtar kelime girin ve Enter'a basın"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Diğer */}
                    <div className="card mb-5">
                        <SectionLabel t={"Ek İçerikler"} />
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <div className="d-flex">
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 1 ? "bg-info" : ""}`} onClick={() => { setTabs(1) }}>
                                            <i className={`fa-regular fa-image me-2 ${Tabs === 1 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 1 ? "text-white" : ""}`}>Galeri</div>
                                        </div>
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 2 ? "bg-info" : ""}`} onClick={() => { setTabs(2) }}>
                                            <i className={`fa-solid fa-video me-2 ${Tabs === 2 ? " text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 2 ? " text-white" : ""}`}>Video</div>
                                        </div>
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 3 ? "bg-info" : ""}`} onClick={() => { setTabs(3) }}>
                                            <i className={`fa-solid fa-microphone-lines me-2 ${Tabs === 3 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 3 ? "text-white" : ""}`}>Podcast</div>
                                        </div>
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 4 ? "bg-info" : ""}`} onClick={() => { setTabs(4) }}>
                                            <i className={`fa-solid fa-map-pin me-2 ${Tabs === 4 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 4 ? "text-white" : ""}`}>Etkinlik</div>
                                        </div>
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${Tabs === 5 ? "bg-info" : ""}`} onClick={() => { setTabs(5) }}>
                                            <i className={`fa-solid fa-book me-2 ${Tabs === 5 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${Tabs === 5 ? "text-white" : ""}`}>Döküman</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" hidden={Tabs === 1 ? false : true}>
                                    <Flex.Upload.Galery />
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
                                <div className="col-12" hidden={Tabs === 5 ? false : true}>
                                    <Flex.Documenter />
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
                        <div className="card-body p-4">
                            <Flex.Upload.Single
                                value={Image}
                                placeholder="Haber Görseli Seçin"
                                onChange={(e: any) => { setImage(e) }}
                                permissions={{
                                    maxWidth: 1024,
                                    maxHeight: 576,
                                    situation: "equals",
                                    fileType: ['image/jpeg', 'image/png', 'image/jpg'],
                                    fileSize: 5
                                }}
                            />
                        </div>
                    </div>

                    {/* Yazar */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Yazar</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body p-4">
                            <Flex.Select.Multiple
                                data={AuthorData}
                                columns={["id", "name", "surname"]}
                                settings={{
                                    conteinerClass: "h-auto"
                                }}
                                value={Author}
                                onChange={(e: any) => { setAuthor(e) }}
                            />
                        </div>
                    </div>

                    {/* Kategori */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Kategori</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body p-4">
                            <Flex.Select.Multiple
                                data={CategoryData}
                                columns={["id", "name"]}
                                settings={{
                                    conteinerClass: "h-200px",
                                    search: true
                                }}
                                value={Category}
                                onChange={(e: any) => { setCategory(e) }}
                            />
                        </div>
                    </div>

                    {/* Ayarlar */}
                    <div className="card mb-5">
                        <div className="h-20px d-flex align-items-center p-10 pt-6 pb-6 border border-gray-200 bg-gray-200" style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <div className="fs-6 fw-bold w-100">Ayarlar</div>
                            <i className="fa-solid fa-angle-down fs-1"></i>
                        </div>
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-12 mb-2">
                                    <div className="d-flex">
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${TabsSettings === 1 ? "bg-info" : ""}`} onClick={() => { setTabsSettings(1) }}>
                                            <i className={`fa-solid fa-rocket me-2 ${TabsSettings === 1 ? "text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${TabsSettings === 1 ? "text-white" : ""}`}>Öne Çıkar</div>
                                        </div>
                                        <div className={`w-100 h-35px border border-gray-300 d-flex align-items-center p-3 me-1 rounded-1 justify-content-center cursor-pointer ${TabsSettings === 2 ? "bg-info" : ""}`} onClick={() => { setTabsSettings(2) }}>
                                            <i className={`fa-solid fa-calendar-days me-2 ${TabsSettings === 2 ? " text-white" : ""}`}></i>
                                            <div className={`fs-7 fw-semibold ${TabsSettings === 2 ? " text-white" : ""}`}>Planla</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" hidden={TabsSettings === 1 ? false : true}>

                                    <div className="col-12 mb-1 mt-2">
                                        <div className={`card card-body p-4 ${FeaturedError ? "border-info bg-light-info" : ""}`}>
                                            <div className="form-check form-switch cursor-pointer">
                                                <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="post_featured" checked={FeaturedContentStatus} onChange={(e: any) => {
                                                    setFeaturedContentStatus(e.target.checked)
                                                    !e.target.checked && setFeaturedImageStatus(e.target.checked)
                                                    !e.target.checked && setFeaturedDateStatus(e.target.checked)
                                                }} />
                                                <label className="form-check-label cursor-pointer" htmlFor="post_featured">Haberi Öne Çıkar</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-2 mt-2">
                                        <div className="card card-body p-4">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="post_featured_image" checked={FeaturedImageStatus} onChange={(e: any) => {
                                                    !FeaturedContentStatus && setFeaturedError(true)
                                                    FeaturedContentStatus && setFeaturedImageStatus(e.target.checked)
                                                }} />
                                                <label className="form-check-label cursor-pointer" htmlFor="post_featured_image">Önce Çıkan Görsel Belirle</label>
                                            </div>
                                            <AreaInfo t={"Öne Çıkan görsel haber görseliniz yerine gösterilir."} />
                                        </div>
                                    </div>
                                    {

                                        FeaturedImageStatus &&
                                        <div className="col-12 mb-2">
                                            <Flex.Upload.Single
                                                value={Image}
                                                placeholder="Öne Çıkan Görsel (Opsiyonel)"
                                                onChange={(e: any) => { setImage(e) }}
                                                permissions={{
                                                    maxWidth: 1024,
                                                    maxHeight: 576,
                                                    situation: "equals",
                                                    fileType: ['image/jpeg', 'image/png', 'image/jpg'],
                                                    fileSize: 5
                                                }}
                                            />
                                        </div>
                                    }
                                    <div className="col-12 mb-1 mt-2">
                                        <div className="card card-body p-4">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="post_featured_date" checked={FeaturedDateStatus} onChange={(e: any) => {
                                                    !FeaturedContentStatus && setFeaturedError(true)
                                                    FeaturedContentStatus && setFeaturedDateStatus(e.target.checked)
                                                }} />
                                                <label className="form-check-label cursor-pointer" htmlFor="post_featured_date">Tarihe Göre</label>
                                            </div>
                                            <AreaInfo t={"Haberiniz belirlediğiniz tarihe kadar öne çıkarılır."} />
                                        </div>
                                    </div>
                                    {
                                        FeaturedDateStatus &&
                                        <div className="col-12 mb-2">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="fs-8 fw-bold mb-1 text-gray-700">Tarih:<span className="text-gray-400 ms-3">(Opsiyonel)</span></label>
                                                    <Flex.Picker.Date value={""} onChange={(e: any) => { }} />
                                                </div>
                                                <div className="col-12">
                                                    <div className="d-flex">
                                                        <div className="w-100">
                                                            <Flex.Select.Single
                                                                data={Array.from({ length: 24 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                                                column={["id", "value"]}
                                                                placeholder="Saat"
                                                                settings={{ search: false }}
                                                            />
                                                        </div>
                                                        <div className="ms-2 me-2 d-flex align-items-center justify-content-center">
                                                            <i className="fa-regular fa-clock fs-4"></i>
                                                        </div>
                                                        <div className="w-100">
                                                            <Flex.Select.Single
                                                                data={Array.from({ length: 60 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                                                column={["id", "value"]}
                                                                placeholder="Dakika"
                                                                settings={{ search: false }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {/* PLANNER */}
                                <div className="col-12" hidden={TabsSettings === 2 ? false : true}>

                                    <div className="col-12 mb-2 mt-2">
                                        <div className="card card-body p-4">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="post_featured" checked={PlannerPost} onChange={(e: any) => {
                                                    setPlannerPost(e.target.checked)
                                                }} />
                                                <label className="form-check-label" htmlFor="post_featured">Bu Haberi Planla</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-2" hidden={PlannerPost ? false : true}>
                                        <InputLabel t={"Tarih:"} />
                                        <Flex.Picker.Date value={""} onChange={(e: any) => { }} />
                                    </div>

                                    <div className="col-12 mb-2" hidden={PlannerPost ? false : true}>
                                        <InputLabel t={"Saat:"} />
                                        <div className="d-flex">
                                            <div className="w-100">
                                                <Flex.Select.Single
                                                    data={Array.from({ length: 24 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                                    column={["id", "value"]}
                                                    placeholder="Saat"
                                                    settings={{ search: false }}
                                                />
                                            </div>
                                            <div className="w-100px d-flex align-items-center justify-content-center">
                                                <i className="fa-regular fa-clock fs-1"></i>
                                            </div>
                                            <div className="w-100">
                                                <Flex.Select.Single
                                                    data={Array.from({ length: 60 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                                    column={["id", "value"]}
                                                    placeholder="Dakika"
                                                    settings={{ search: false }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">
                    <div className="w-100 d-flex">
                        <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off" hidden={query.id ? true : false}>
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Yayınla
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>

                        <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off" hidden={true}>
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Onaya Gönder
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

                        <button type="button" className="btn btn-secondary btn-sm border border-gray-300 me-20" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-eye me-1"></i>
                                Ön İzleme
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                    <div className="w-100 d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary btn-sm border border-gray-300" data-kt-indicator="off" onClick={() => { OnBack() }}>
                            <span className="indicator-label">
                                <i className="fa-regular fa-circle-left me-1"></i>
                                Listeye Geri Dön
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>


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


export default Page;