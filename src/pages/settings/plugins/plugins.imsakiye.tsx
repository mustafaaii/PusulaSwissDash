import { Flex } from "@/module/module"
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export async function getServerSideProps(context: any) {
    const { p, l, s, o, t, c } = context.query;
    const response = await axios.get(`http://localhost:3001/api/settings/plugins/imsakiye?p=${p}&l=${l}&s=${s}&o=${o}`);

    return {
        props: {
            data: response.data.data,
            totalPages: response.data.totalPages,
            totalPosts: response.data.totalPosts,
            currentPage: response.data.currentPage,
            title: t ? t === "EDIT" ? `İmsakiye Düzenle` : "Yeni İmsakiye" : "İmsakiye Listesi",
            path: t ? t === "EDIT" ? "İmsakiye Düzenle" : "Yeni İmsakiye" : "Kategori Listesi",
        },
    };
}


const List = ({ props }: { props: any }) => {

    const data: any = [
        { "id": 1, "value": "Aarau", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 2, "value": "Aarburg", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 3, "value": "Baar", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 4, "value": "Basel", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 5, "value": "Bern", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 6, "value": "Biel", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 7, "value": "Buchs", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 8, "value": "Bulach", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 9, "value": "Burglen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 10, "value": "Dottingen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 11, "value": "Glarus", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 12, "value": "Herzogenbuchsee", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 13, "value": "Kreuzlingen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 14, "value": "Lachen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 15, "value": "Langenthal", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 16, "value": "Lugano", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 17, "value": "Monthey", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 18, "value": "Moudon", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 19, "value": "Neuchatel", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 20, "value": "Reinach", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 21, "value": "Renens", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 22, "value": "Rheinfelden-Karsau", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 23, "value": "Rorschach", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 24, "value": "Ruti", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 25, "value": "Sankt Gallen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 26, "value": "Schaffhausen", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 27, "value": "Seon", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 28, "value": "Solothurn", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 29, "value": "Suhr", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 30, "value": "Uster", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 31, "value": "Vaduz", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 32, "value": "Wadenswil", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 33, "value": "Wil", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 34, "value": "Winterthur", status: 1, creation_date: "2025-02-27 19:37:08" },
        { "id": 35, "value": "Zurih", status: 1, creation_date: "2025-02-27 19:37:08" }
    ]


    const router = useRouter()
    const [Drawer, setDrawer] = useState<string>("")

    const ConvertDate = (dateString: string) => {
        if (!dateString) return "";
        const aylar = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        const date = new Date(dateString);
        const gun = date.getDate();
        const ay = aylar[date.getMonth()];
        const yil = date.getFullYear();
        const saat = date.getHours().toString().padStart(2, "0");
        const dakika = date.getMinutes().toString().padStart(2, "0");
        return `${gun} ${ay} ${yil}`;
    };
    const ConvertTime = (dateString: string) => {
        if (!dateString) return "";
        const aylar = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        const date = new Date(dateString);
        const gun = date.getDate();
        const ay = aylar[date.getMonth()];
        const yil = date.getFullYear();
        const saat = date.getHours().toString().padStart(2, "0");
        const dakika = date.getMinutes().toString().padStart(2, "0");
        return `${saat}:${dakika}`;
    };

    const Capitalize = (text: string) => {
        if (!text) return '';

        return text
            .split(' ')
            .map(word => {
                if (!word) return '';
                const firstChar = word.charAt(0).toUpperCase();
                const rest = word
                    .slice(1)
                    .toLowerCase()
                    .replace(/İ/g, 'İ');

                return firstChar + rest;
            })
            .join(' ');
    };
    const totalPages = props.totalPages;
    const currentPage = props.currentPage;
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const [Limit, setLimit] = useState<any>(10)
    const OnLimit = (e: any) => {
        const params: any = new URLSearchParams(window.location.search);
        const p = 1;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        router.push(`/ayarlar/eklentiler/imsakiye?p=${p}&l=${e}${s}&o=${o}`)
    }
    const OnPage = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        router.push(`/ayarlar/eklentiler/imsakiye?p=${e}&l=${l}${s}&o=${o}`);
    };
    const OnSearch = (e: any) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const o = params.get("o") ? params.get("o") : "DESC";
        const s = e ? `&s=${decodeURIComponent(e)}` : ``
        router.push(`/ayarlar/eklentiler/imsakiye?p=${p}&l=${l}${s}&o=${o}`);
    }
    const [Order, setOrder] = useState<any>(1)
    const OnOrder = (e: number) => {
        const params = new URLSearchParams(window.location.search);
        const p = 1;
        const l = params.get("l") || 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = e === 1 ? "DESC" : "ASC"
        router.push(`/ayarlar/eklentiler/imsakiye?p=${p}&l=${l}${s}&o=${o}`);
    };
    const OnEdit = (c: any, e: number) => {
        const params = new URLSearchParams(window.location.search);
        const p = params.get("p") ? params.get("p") : 1;
        const l = params.get("l") ? params.get("l") : 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        router.push(`/ayarlar/eklentiler/imsakiye?t=EDIT&p=${p}&l=${l}${s}&o=${o}&c=${Seo(c)}&i=${e}`);
    };
    const [OldProgress, setOldProgress] = useState<any>(0)
    useEffect(() => {
        const params: any = new URLSearchParams(window.location.search);
        setLimit(parseInt(params.get("l")))
        setOrder(params.get("o") === "ASC" ? 2 : 1)
        const i = params.get("i") ? params.get("i") : null;
        if (i) {
            setOldProgress(i)
        } else {
            setOldProgress(0)
        }

    }, [])
    const [Monthly, setMonthly] = useState<any>([])
    const Seo = (e: any) => {

        const turkishMap: any = {
            'ç': 'c',
            'Ç': 'C',
            'ğ': 'g',
            'Ğ': 'G',
            'ı': 'i',
            'I': 'I',
            'İ': 'i',
            'ö': 'o',
            'Ö': 'O',
            'ş': 's',
            'Ş': 'S',
            'ü': 'u',
            'Ü': 'U',
            ' ': '-',
            '/': '-',
            '&': 've',
            '.': '-',
        };
        return e.toLowerCase()
            .replace(/[çğışüöÇĞİŞÜÖ&/. ]/g, function (m: any) { return turkishMap[m]; })
            .replace(/[^a-z0-9\-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

    }

    return (
        <>
            <div className="d-flex mb-5">
                <div className="w-800px d-flex justify-content-start me-2">
                    <Flex.Search onChange={(e: any) => { OnSearch(e) }} SearchSession={"NewsCategory"} />
                </div>
                <div className="w-100 d-flex justify-content-end">
                    <div className="me-2 w-225px" >
                        <Flex.Select.Single
                            value={Order}
                            data={[
                                { id: 1, value: "Tarihe Göre Azalan" },
                                { id: 2, value: "Tarihe Göre Artan" },

                            ]}
                            column={["id", "value"]}
                            placeholder="Gösteri (10)"
                            settings={{ search: false }}
                            onChange={(e: any) => {
                                setOrder(e)
                                OnOrder(e)
                            }}
                        />
                    </div>
                    <div className="me-2 w-150px" >
                        <Flex.Select.Single
                            value={Limit}
                            data={[
                                { id: 10, value: 10 },
                                { id: 25, value: 25 },
                                { id: 50, value: 50 },
                                { id: 150, value: 150 },
                                { id: 250, value: 250 },
                                { id: 500, value: 500 },
                            ]}
                            column={["id", "value"]}
                            placeholder="Gösteri (10)"
                            settings={{ search: false }}
                            onChange={(e: any) => {
                                setLimit(e)
                                OnLimit(e)
                            }}
                        />
                    </div>
                </div>
            </div>
            <table className="table bg-white table-striped table-bordered">
                <thead className="w-100">
                    <tr className="fw-bold fs-6 text-gray-800 bg-gray-200 border border-gray-400">
                        <th className="text-center">
                            <div className="fs-7">Id</div>
                        </th>
                        <th>
                            <div className="fs-7">Adı</div>
                        </th>
                        <th className="text-start">
                            <div className="fs-7">Dosya</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">Durum</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">Tarih</div>
                        </th>
                        <th className="text-center">
                            <div className="fs-7">İşlem</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (props.data || []).map((d: any, x: number) => {
                            return (
                                <tr key={`category-list-${x}`} className={`${parseInt(OldProgress) === d.id ? "bg-light-success" : ""} ${d.post_featured === 1 ? "bg-light-info" : ""} position-relative`}>
                                    <td>
                                        <div className="h-30px d-flex align-items-center justify-content-center fw-bold lh-sm">
                                            {x + 1}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-30px d-flex align-items-center ">
                                            <div className="fs-6 fw-bold lh-sm">
                                                {Capitalize(d.city)}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-30px d-flex align-items-center ">
                                            <div className="w-100">
                                                <div className="fs-6 fw-bold lh-sm mt-3 popover-container">
                                                    <div className="h-30px d-flex align-items-center justify-content-center cursor-pointer">
                                                        <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                            <i className="fa-solid fa-file-pdf fs-5 lh-sm text-gray-700"></i>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">
                                                                PDF Olarak İndir
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="popover">İmsakiyeyi PDF olarak indirebilirsiniz.</div>
                                                </div>
                                            </div>
                                            <div className="w-100">
                                                <div className="fs-6 fw-bold lh-sm mt-3 popover-container">
                                                    <div className="h-30px d-flex align-items-center justify-content-center cursor-pointer">
                                                        <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                            <i className="fa-solid fa-image fs-5 lh-sm text-gray-700"></i>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">
                                                                PNG Olarak İndir
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="popover">İmsakiyeyi PNG olarak indirebilirsiniz.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-30px d-flex align-items-center justify-content-center">
                                            <div className={`fs-7 fw-bold ${d.status === 0 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-xmark me-1 lh-sm text-danger fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-danger">Yayınlanmadı</div>
                                                <div className="popover">Kategoriniz Yayınlanmamış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.status === 1 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-regular fa-circle-check me-1 lh-sm text-success fs-3"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-success">Yayında</div>
                                                <div className="popover">Kategoriniz Yayınlanmış</div>
                                            </div>

                                            <div className={`fs-7 fw-bold ${d.status === 2 ? "d-flex" : "d-none"} align-items-center popover-container`} >
                                                <i className="fa-solid fa-clock-rotate-left me-1 lh-sm text-warning fs-7"></i>
                                                <div className="lh-sm fw-bold fs-8 lh-sm text-warning">Taslak</div>
                                                <div className="popover">Kategoriniz Taslak Olarak Kaydedilmiş</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-30px d-flex align-items-center justify-content-center">
                                            <div className="d-flex align-items-center justify-content-center bg-light-secondary border border-gray-500 me-2 h-30px w-30px popover-container" style={{ borderRadius: "100%" }}>
                                                <i className="fa-regular fa-calendar-days fs-5 lh-sm"></i>
                                            </div>
                                            <div className="d-flex">
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertDate(d.creation_date)}</div>
                                                <div className="fw-bold fs-7 me-1 text-gray-700 lh-sm">{ConvertTime(d.creation_date)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-30px d-flex align-items-center justify-content-center">
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { setDrawer("analytics"); setMonthly(d.monthly_views) }}>
                                                <i className="fa-solid fa-chart-simple fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { OnEdit(d.city, d.id) }}>
                                                <i className="fa-solid fa-square-pen fs-6 text-gray-500"></i>
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-danger toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                <i className="fa-solid fa-trash-can fs-6 text-gray-500"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">


                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <ul className="pagination pagination-outline mt-4">

                            <li
                                className={`page-item cursor-pointer m-1 ${currentPage == 1 ? "disabled" : ""}`}
                                onClick={() => currentPage > 1 && OnPage(currentPage - 1)}
                            >
                                <div className="page-link border border-gray-300">«</div>
                            </li>

                            {startPage > 1 && (
                                <>
                                    <li className="page-item cursor-pointer m-1" onClick={() => OnPage(1)}>
                                        <div className="page-link border border-gray-300">1</div>
                                    </li>
                                    <li className="page-item cursor-pointer m-1 disabled">
                                        <div className="page-link border border-gray-300">...</div>
                                    </li>
                                </>
                            )}

                            {pages.map((pageNum) => (
                                <li
                                    key={pageNum}
                                    className={`page-item cursor-pointer m-1 ${currentPage == pageNum ? "active" : ""}`}
                                    onClick={() => OnPage(pageNum)}
                                >
                                    <div className="page-link border border-gray-300">{pageNum}</div>
                                </li>
                            ))}

                            {endPage < totalPages && (
                                <>
                                    <li className="page-item cursor-pointer m-1 disabled">
                                        <div className="page-link border border-gray-300">...</div>
                                    </li>
                                    <li className="page-item cursor-pointer m-1" onClick={() => OnPage(totalPages)}>
                                        <div className="page-link border border-gray-300">{totalPages}</div>
                                    </li>
                                </>
                            )}

                            <li
                                className={`page-item cursor-pointer m-1 ${currentPage == totalPages ? "disabled" : ""}`}
                                onClick={() => currentPage < totalPages && OnPage(currentPage + 1)}
                            >
                                <div className="page-link border border-gray-300">»</div>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </>
    )
}

const Edit = () => {
    const { query, push }: any = useRouter();

    const Capitalize = (text: string) => {
        if (!text) return '';

        return text
            .split(' ')
            .map(word => {
                if (!word) return '';
                const firstChar = word.charAt(0).toUpperCase();
                const rest = word
                    .slice(1)
                    .toLowerCase()
                    .replace(/İ/g, 'İ');

                return firstChar + rest;
            })
            .join(' ');
    };
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
    const OnBack = () => {
        const params = new URLSearchParams(window.location.search);
        const p = params.get("p") ? params.get("p") : 1;
        const l = params.get("l") ? params.get("l") : 10;
        const s = params.get("s") ? `&s=${params.get("s")}` : "";
        const o = params.get("o") ? params.get("o") : "DESC";
        const i = params.get("i") ? params.get("i") : "";
        push(`/ayarlar/eklentiler/imsakiye?p=${p}&l=${l}${s}&o=${o}&i=${i}`);
    }


    const [CityName, setCityName] = useState<any>("")
    const [ImsakiyeData, setImsakiyeData] = useState<any>([])
    useEffect(() => {
        const GetAuthors = async () => {
            const response = await axios.get(`/api/settings/plugins/find?id=${query.i}`)

            if (response.data.data.length > 0) {
                setCityName(response.data.data[0]["city_name"])
                setImsakiyeData(response.data.data)
            }
        }
        GetAuthors();
    }, [])

    const [EditId, setEditId] = useState<any>(null)
    const [Drawer, setDrawer] = useState<any>("")



    return (
        <>
            <div className="row">
                <div className="fs-1 mb-5">
                    <div className="d-flex">
                        <div className="w-100">
                            <span className="fw-bolder text-start mb-5 text-info me-2">{CityName}</span>
                            <span className="fw-bolder">Şehri İçin İmsak Vakitleri</span>
                        </div>
                        <div className="w-100 d-flex justify-content-end">
                            <button className="btn btn-primary fs-6 d-flex align-items-center" style={{ height: "43.52px" }} onClick={() => { setDrawer("add") }}>
                                <i className="fa-solid fa-circle-plus fs-4"></i>
                                <div className="fs-7">Ekle</div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-6 mb-2">
                            <Flex.Upload.Single
                                value={""}
                                placeholder="PDF Dosyası"
                                onChange={(e: any) => { console.log(e) }}
                                permissions={{
                                    situation: "equals",
                                    fileType: ['application/pdf'],
                                    fileSize: 5
                                }}
                                className={{
                                    height: "h-125px"
                                }}

                            />
                        </div>
                        <div className="col-6 mb-2">
                            <Flex.Upload.Single
                                value={"https://api.pusulaswiss.ch/upload/posts/67c1b9bd27493.jpg"}
                                placeholder="Resim Dosyası"
                                onChange={(e: any) => { console.log(e) }}
                                permissions={{
                                    situation: "equals",
                                    fileType: ['image/jpeg', 'image/png', 'image/jpg'],
                                }}
                                className={{
                                    height: "h-125px"
                                }}
                            />
                        </div>

                    </div>
                </div>
                <div className="col-12">
                    <table className="table bg-white table-striped table-bordered">
                        <thead className="w-100">
                            <tr className="fw-bold fs-6 text-gray-800 bg-gray-200 border border-gray-400">
                                <th className="text-start">
                                    <div className="fs-7">Hicri Tarih</div>
                                </th>
                                <th className="text-start">
                                    <div className="fs-7">Miladi Tarih	</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">Şehir</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">İmsak</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">Güneş</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">Öğle</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">İkindi</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">Akşam</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">Yatsı</div>
                                </th>
                                <th className="text-center">
                                    <div className="fs-7">İşlem</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (ImsakiyeData || []).map((d: any, x: number) => {
                                    return (
                                        <tr key={`category-list-${x}`}>
                                            <td className="w-250px">
                                                <div className="h-50px d-flex align-items-center fw-bold lh-sm">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.hicri} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.hicri}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-250px">
                                                <div className="h-50px d-flex align-items-center fw-bold lh-sm">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.miladi} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.miladi}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center text-info fw-bold">
                                                    <div className="fs-7">{d.city_name}</div>
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.imsak} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.imsak}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.sun} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.sun}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.noon} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.noon}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.afternoon} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.afternoon}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.evening} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.evening}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td className="w-100px">
                                                <div className="h-50px d-flex align-items-center justify-content-center">
                                                    {
                                                        EditId === d.id ?
                                                            <input className="form-control fs-7" value={d.isha} onChange={(e: any) => { }} />
                                                            :
                                                            <div className="fs-7">{d.isha}</div>
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className="h-50px d-flex align-items-center justify-content-center">

                                                    {
                                                        EditId === d.id ?
                                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { setEditId(null) }}>
                                                                <i className="fa-solid fa-circle-check fs-6 text-gray-500"></i>
                                                            </button>
                                                            :
                                                            <button className="btn btn-sm btn-icon btn-light btn-active-light-primary toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }} onClick={() => { setEditId(d.id) }}>
                                                                <i className="fa-solid fa-square-pen fs-6 text-gray-500"></i>
                                                            </button>
                                                    }

                                                    <button className="btn btn-sm btn-icon btn-light btn-active-light-danger toggle h-30px w-30px border me-1 ms-1 border border-gray-500" style={{ borderRadius: "100%" }}>
                                                        <i className="fa-solid fa-trash-can fs-6 text-gray-500"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="sticky-container">
                <div className="sticky-inner shadow-sm border border-gray-300">
                    <div className="w-100 d-flex">
                        <button type="button" className="btn btn-primary btn-sm me-5" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-paper-plane me-1"></i>
                                Güncelle
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


            <div className={`bg-white drawer drawer-end ${Drawer === "add" ? "drawer-on" : ""}`} style={{ width: "1000px" }}>
                <div className="card w-100 rounded-0">
                    <div className="card-header pe-5">
                        <div className="card-title">
                            <div className="d-flex justify-content-center flex-column me-3">
                                <div className="fs-4 fw-bold text-gray-900 me-1 lh-1">
                                    İmsak Vakti Ekle
                                </div>
                            </div>
                        </div>
                        <div className="card-toolbar">
                            <div className="btn btn-sm btn-icon btn-active-light-primary" onClick={() => { setDrawer("") }}>
                                <i className="fa-solid fa-circle-xmark fs-1"></i>
                            </div>
                        </div>
                    </div>
                    <div className="card-body hover-scroll-overlay-y">
                        <div className="row">

                            <div className="col-6 mb-5">
                                <InputLabel t={"Hicri Tarih"} />
                                <input
                                    style={{ paddingRight: 40 }}
                                    className="form-control"
                                    placeholder="Hicri Tarihi"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>

                            <div className="col-6 mb-5">
                                <InputLabel t={"Miladi Tarih"} />
                                <input
                                    style={{ paddingRight: 40 }}
                                    className="form-control"
                                    placeholder="Miladi Tarihi"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>




                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"İmsak"} />
                                <input
                                    className="form-control text-center"
                                    placeholder="İmsak"
                                    value={""}
                                    onChange={(e: any) => {

                                    }}
                                />
                            </div>
                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"Güneş"} />
                                <input
                                    className="form-control text-center"
                                    placeholder="Güneş"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"Öğle"} />
                                <input
                                    className="form-control text-center"
                                    placeholder="Öğle"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"İkindi"} />
                                <input
                                    style={{ paddingRight: 40 }}
                                    className="form-control text-center"
                                    placeholder="İkindi"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"Akşam"} />
                                <input
                                    className="form-control"
                                    placeholder="Akşam"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                            <div className="col-2 mb-5 text-center">
                                <InputLabel t={"Yatsı"} />
                                <input
                                    className="form-control"
                                    placeholder="Yatsı"
                                    value={""}
                                    onChange={(e: any) => {
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer pt-2 pb-2">
                        <button type="button" className="btn btn-primary me-5" data-kt-indicator="off">
                            <span className="indicator-label">
                                <i className="fa-solid fa-circle-plus me-1"></i>
                                Ekle
                            </span>
                            <span className="indicator-progress">
                                İşleniyor... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="drawer-overlay" onClick={() => { setDrawer("") }} style={{ zIndex: 109, display: Drawer !== "" ? "block" : "none" }}></div>
        </>

    )
}


function Page(props: any) {
    const { query } = useRouter()


    return query.t ? <Edit /> : <List props={props} />
}
export default Page;