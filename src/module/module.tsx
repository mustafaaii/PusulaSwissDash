/**
 * 
 * @package Flex Element
 * @version 5.2.6
 * @name Flex-element-modules
 * @description Flex Element Managed Package Modules
 * @copyright Mustafa Işık
 * 
 * 
 */

import { FlexFunction } from "@/function/function"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import styles from '../asset/css/Loader.module.css';




/**
 * 
 * 
 * @version 3.1.1-2025
 * @name SingleUpload
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */
interface SingleUpload {
    value?: string
    onChange?: any
    placeholder?: string,
    className?: {
        height: string
    } | any,
    permissions?: {
        maxWidth?: any,
        maxHeight?: any,
        situation?: any,
        fileType?: any,
        fileSize?: any
    }
}

const SingleUpload = ({
    value,
    onChange,
    placeholder,
    className = {
        height: "h-175px"
    },
    permissions = {
        maxWidth: null,
        maxHeight: null,
        situation: "",
        fileType: ['image/jpeg', 'image/png', 'image/jpg'],
        fileSize: 5
    }
}: SingleUpload) => {
    const selectref: any = useRef(null);
    const [selected, setselected] = useState<any>({ blob: null, file: null, error: 0, type: null, pixel: null, size: null });
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Byte";

        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
    };
    const validateImageDimensions = (file: File, maxWidth: number, maxHeight: number): Promise<boolean> => {
        return new Promise((resolve) => {
            const img: any = new Image();
            const reader = new FileReader();
            reader.onload = (e: any) => {
                img.onload = () => {
                    if (permissions.situation === "equals") {
                        if (img.width === maxWidth && img.height === maxHeight) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                };
                img.onerror = () => resolve(false);
                img.src = e.target.result;
            };
            reader.onerror = () => resolve(false);
            reader.readAsDataURL(file);
        });
    };
    const ImageDimensions = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const img: any = new Image();
            const reader = new FileReader();
            reader.onload = (e: any) => {
                img.onload = () => {
                    const result: any = `${img.width}X${img.height}`
                    resolve(result);
                };
                img.onerror = () => resolve(false);
                img.src = e.target.result;
            };
            reader.onerror = () => resolve(false);
            reader.readAsDataURL(file);
        });
    };


    const Icon = ({ t }: { t: any }) => {
        switch (t) {
            case "application/pdf": return (
                <div>
                    <div className="card card-body p-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-file-pdf fs-1"></i>
                        </div>
                    </div>
                </div>
            )
            case "image/jpeg": return (
                <div>
                    <div className="card card-body p-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-image fs-1"></i>
                        </div>
                    </div>
                </div>
            )
            case "image/png": return (
                <div>
                    <div className="card card-body p-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-image fs-1"></i>
                        </div>
                    </div>
                </div>
            )
            case "image/jpg": return (
                <div>
                    <div className="card card-body p-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-image fs-1"></i>
                        </div>
                    </div>
                </div>
            )
            default: return null
        }
    }
    const View = ({ p, b, e, ty, px, si }: { p?: any, b?: any, e?: any, ty?: any, px?: any, si?: any }) => {

        return (
            <>
                <div className={`card mb-2 border ${e === 0 ? "border-gray-400" : ""} ${e === 200 ? "border-gray-300" : ""} ${e === 301 ? "border-danger" : ""} ${e === 302 ? "border-danger" : ""} ${e === 303 ? "border-danger" : ""} rounded-2 background-image-cover`} style={{ backgroundImage: `url(${b})` }}>
                    <div className={`card-body ${className.height} p-0 ${e === 0 ? "bg-gray-200" : ""} ${e === 301 ? "bg-light-danger" : ""} ${e === 302 ? "bg-light-danger" : ""} ${e === 303 ? "bg-light-danger" : ""} rounded-2 d-flex align-items-center justify-content-center position-relative`}>


                        <div className={`fw-bold fs-7 text-gray-700 bg-white d-flex p-3 pt-2 pb-2 rounded-2 border border-gray-300 ${e === 0 ? "d-flex" : "d-none"}`}>
                            {p}
                        </div>

                        <div className={e === 200 ? "d-flex" : "d-none"}>
                            <Icon t={ty} />
                        </div>

                        <div className={`fw-bold fs-8 text-gray-700 bg-white d-flex p-3 pt-2 pb-2 rounded-2 border border-gray-300 ${e === 301 ? "d-flex" : "d-none"}`}>
                            <div className="fw-bold text-dark">Dosya Türü</div>
                            {permissions.fileType.map((d: any) => { return (<div className="me-1 ms-1 fw-bolder text-danger">.{d.split("/")[1]}</div>) })}
                            <div className="fw-bold text-dark">Olmalıdır</div>
                        </div>

                        <div className={`fw-bold fs-8 text-gray-700 bg-white d-flex p-3 pt-2 pb-2 rounded-2 border border-gray-300 ${e === 302 ? "d-flex" : "d-none"}`}>
                            <div className="fw-bolder text-dark">Dosya Piksel'i</div>
                            <div className="me-1 ms-1 fw-bolder text-danger">{permissions.maxWidth}X{permissions.maxHeight}</div>
                            <div className="fw-bold text-dark">Olmalıdır</div>
                        </div>

                        <div className={`fw-bold fs-8 text-gray-700 bg-white d-flex p-3 pt-2 pb-2 rounded-2 border border-gray-300 ${e === 303 ? "d-flex" : "d-none"}`}>
                            <div className="fw-bolder text-dark">Dosya Boyutu En Fazla</div>
                            <div className="me-1 ms-1 fw-bolder text-danger">{permissions.fileSize} MB</div>
                            <div className="fw-bold text-dark">Olmalıdır</div>
                        </div>
                        {
                            ty &&
                            <div className={`p-1 position-absolute w-100 ${e === 200 ? "" : "d-none"}`} style={{ bottom: 0 }}>
                                <div className={`d-flex p-2 rounded-2 w-100 `} style={{ backgroundColor: "#1e2129d4" }}>
                                    <div className={`w-100 d-flex justify-content-center`}>
                                        <div className="fs-8 me-2 fw-semibold text-white">Tür</div>
                                        <div className="fs-8 fw-bold text-white">{ty}</div>
                                    </div>
                                    <div className={`w-100 d-flex justify-content-center`}>
                                        <div className="fs-8 me-2 fw-semibold text-white">Piksel</div>
                                        <div className="fs-8 fw-bold text-white">{px}</div>
                                    </div>
                                    <div className={`w-100 d-flex justify-content-center`}>
                                        <div className="fs-8 me-2 fw-semibold text-white">Boyut</div>
                                        <div className="fs-8 fw-bold text-white">{si}</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
    const Menu = ({ e }: { e?: any }) => {

        switch (e) {
            case 0: return (
                <>
                    <div className={`d-flex`}>
                        <div className="w-100">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-400 p-2 rounded-2 bg-info cursor-pointer bg-hover-gray-200" onClick={() => { selectref.current.click(); }}>
                                <div className="me-1">
                                    <i className="fa-solid fa-cloud-arrow-up fs-4 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Dosya Seçin</div>
                            </div>
                        </div>
                    </div>
                </>
            )
            case 200: return (
                <>
                    <div className={`d-flex`}>
                        <div className="w-100 me-1">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-danger" onClick={() => { setselected({ blob: null, file: null, error: 0, type: null, pixel: null, size: null }) }}>
                                <div className="me-1">
                                    <i className="fa-regular fa-circle-xmark fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Sil</div>
                            </div>
                        </div>
                        <div className="w-100 me-1">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-info" onClick={() => { selectref.current.click(); }}>
                                <div className="me-1">
                                    <i className="fa-solid fa-arrows-rotate fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Değiştir</div>
                            </div>
                        </div>
                        <div className="w-100 me-1">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-primary" onClick={() => { open(selected.blob, "blank") }}>
                                <div className="me-1">
                                    <i className="fa-solid fa-magnifying-glass-plus fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Büyüt</div>
                            </div>
                        </div>
                        <div className="w-100">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-warning" onClick={() => { open(selected.blob, "blank") }}>
                                <div className="me-1">
                                    <i className="fa-solid fa-cloud-arrow-down fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">İndir</div>
                            </div>
                        </div>
                    </div>
                </>
            )
            default: return (
                <>
                    <div className={`d-flex`}>
                        <div className="w-100 me-1">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-danger" onClick={() => { setselected({ blob: null, file: null, error: 0, type: null, pixel: null, size: null }) }}>
                                <div className="me-1">
                                    <i className="fa-regular fa-circle-xmark fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Sil</div>
                            </div>
                        </div>
                        <div className="w-100 me-1">
                            <div className="h-35px d-flex align-items-center justify-content-center border border-gray-300 p-2 rounded-2 cursor-pointer bg-primary" onClick={() => { selectref.current.click(); }}>
                                <div className="me-1">
                                    <i className="fa-solid fa-arrows-rotate fs-5 lh-sm text-white"></i>
                                </div>
                                <div className="fs-8 fw-bold lh-sm text-white">Değiştir</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }



    }
    const Select = async (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        if (file) {

            if (!permissions.fileType.includes(file.type)) {
                setselected({
                    blob: null,
                    file: null,
                    error: 301,
                    type: file.type,
                    pixel: ImageDimensions(file),
                    size: formatFileSize(file.size)
                });
                if (selectref.current) {
                    selectref.current.value = "";
                }
                return;
            }

            if (permissions.maxWidth) {
                const isValid = await validateImageDimensions(file, permissions.maxWidth, permissions.maxHeight);
                if (!isValid) {
                    setselected({
                        blob: null,
                        file: null,
                        error: 302,
                        type: file.type,
                        pixel: ImageDimensions(file),
                        size: formatFileSize(file.size)
                    });
                    if (selectref.current) {
                        selectref.current.value = "";
                    }
                    return;
                }
            }

            if (permissions.fileSize) {
                if (file.size > permissions.fileSize * 1024 * 1024) {
                    setselected({
                        blob: null,
                        file: null,
                        error: 303,
                        type: file.type,
                        pixel: ImageDimensions(file),
                        size: formatFileSize(file.size)
                    });
                    if (selectref.current) {
                        selectref.current.value = "";
                    }
                    return;
                }
            }


            const blob = URL.createObjectURL(file);
            setselected({
                blob: blob,
                file: file,
                error: 200,
                type: file.type,
                pixel: ImageDimensions(file),
                size: formatFileSize(file.size)
            });
            onChange(file);
        }

        if (selectref.current) {
            selectref.current.value = "";
        }
    };

    useEffect(() => {
        if (value) {
            setselected({
                blob: value,
                file: null,
                error: 200,
                type: null,
                pixel: null,
                size: null
            });
        } else {
            setselected({ blob: null, file: null, error: 0, type: null, pixel: null, size: null });
        }
    }, []);



    return (
        <>
            <View
                p={placeholder}
                b={selected && selected.blob}
                e={selected && selected.error}
                ty={selected && selected.type}
                px={selected && selected.pixel}
                si={selected && selected.size}
            />
            <Menu
                e={selected && selected.error}
            />
            <input type="file" ref={selectref} onChange={Select} hidden />
        </>
    )
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name MultipleUpload
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */
interface GaleryUpload {

}
const GaleryUpload = () => {
    const multipleSelect: any = useRef(null)
    const [Data, setData] = useState<any>([])

    const SelectItem = (e: any) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const result: any[] = [];

        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        const maxDimension = 1080;

        files.forEach((file: any) => {
            const url = URL.createObjectURL(file);
            const img = new Image();

            img.onload = () => {
                if (file.size <= maxSizeInBytes && img.width <= maxDimension && img.height <= maxDimension) {
                    result.push({
                        id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                        blob: url,
                        file: file,
                        corporate: "",
                        error: 200
                    });
                } else {
                    result.push({
                        id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                        blob: null,
                        file: null,
                        corporate: "",
                        error: file.size > maxSizeInBytes ? 301 : 302 // 301 for size exceeded, 302 for dimension exceeded
                    });
                }
                setData((prevData: any) => [...prevData, ...result]);
            };

            img.onerror = () => {
                result.push({
                    id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                    blob: null,
                    file: null,
                    corporate: "",
                    error: 303
                });
                setData((prevData: any) => [...prevData, ...result]);
            };

            img.src = url;
        });

        if (multipleSelect.current) {
            multipleSelect.current.value = "";
        }
    };


    const DeleteItem = (e: any) => {
        const result = Data.filter((f: any) => { return (f.id !== e) });
        setData(result)
    }


    const Menu = ({ type, id, blob }: { type?: any, id?: any, blob?: any }) => {


        switch (type) {
            case 200: return (
                <>
                    <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(id) }}>
                        <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                    </div>
                    <div className="w-125px h-100px">
                        <div className="w-125px h-100px border border-gray-200 rounded-2 background-image-cover" style={{ backgroundImage: `url(${blob})` }}></div>
                    </div>
                    <div className="w-100 h-100px d-flex align-items-center p-2">
                        <div className="w-100">
                            <div className="d-flex bg-gray-200 h-40px align-items-center p-3 rounded-2 border border-gray-400 mb-1">
                                <div className="w-100 d-flex">
                                    <div className="fw-bolder me-2 fs-7">Piksel</div>
                                    <div className="fw-semibold fs-7">1080X1080</div>
                                </div>
                                <div className="w-100 d-flex">
                                    <div className="fw-bolder me-2 fs-7">Boyut</div>
                                    <div className="fw-semibold fs-7">12.5MB</div>
                                </div>
                                <div className="w-100 d-flex">
                                    <div className="fw-bolder me-2 fs-7">Tür</div>
                                    <div className="fw-semibold fs-7">PNG</div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="w-100">
                                    <input className="form-control h-40px" placeholder="Referans, Telif Hakkı Sahibi" />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="w-100">
                                    <input className="form-control h-40px" placeholder="Referans, Telif Hakkı Sahibi" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            case 301: return (
                <>
                    <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(id) }}>
                        <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                    </div>
                    <div className="w-100px h-100px border border-gray-200 rounded-2 bg-danger">
                        <div className="w-100px h-100px d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-images text-white fs-1"></i>
                        </div>
                    </div>
                    <div className="w-100 h-100px d-flex align-items-center p-2">
                        <div className="w-100">
                            <div className="text-start">
                                <div className="fw-bold fs-6 mb-1">Dosya Boyut hatası</div>
                                <div className="fw-semibold">Dosya Boyutu 2MB'dan büyük olamaz</div>
                            </div>
                        </div>
                    </div>
                </>
            )
            case 302: return (
                <>
                    <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(id) }}>
                        <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                    </div>
                    <div className="w-100px h-100px border border-gray-200 rounded-2 bg-danger">
                        <div className="w-100px h-100px d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-images text-white fs-1"></i>
                        </div>
                    </div>
                    <div className="w-100 h-100px d-flex align-items-center p-2">
                        <div className="w-100">
                            <div className="text-start">
                                <div className="fw-bold fs-6 mb-1">Dosya Pixel hatası</div>
                                <div className="fw-semibold">Dosya Ölçüleri Kare (1080X1080 piksel) olmaıdır.</div>
                            </div>
                        </div>
                    </div>
                </>
            )
            default: return;
        }
    }


    return (
        <>
            <div className="border border-gray-300 rounded-2 p-2">
                <div>
                    {
                        (Data || []).map((d: any, x: number) => {
                            return (
                                <div className={`d-flex w-100 border rounded-1 mb-2 p-2 ${d.error === 301 ? "border-danger" : "border-gray-300"}`}>
                                    <Menu type={d.error} id={d.id} blob={d.blob} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-100 h-100px d-flex align-items-center justify-content-center border border-gray-300 h-100 rounded-1 p-2 cursor-pointer shadow-sm" onClick={() => { multipleSelect.current.click() }}>
                    <div className="text-center">
                        <i className="fa-regular fa-image fs-1"></i>
                        <div className="fs-7 fw-semibold text-gray-600">Haber İçin Galeri Resimleri Ekleyin</div>
                    </div>
                    <input type="file" onChange={SelectItem} ref={multipleSelect} multiple hidden />
                </div>
            </div>
        </>
    )
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name SponsoredUpload
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */
interface SponsoredUpload {

}
const SponsoredUpload = () => {
    const size = (e: any) => {
        if (e > (2 * 1024 * 1024)) {
            return false;
        }
        else {
            return true;
        }
    }
    const multipleSelect: any = useRef(null)
    const [Data, setData] = useState<any>([])

    const SelectItem = (e: any) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const result: any[] = [];

        files.forEach((file: any) => {
            const url = URL.createObjectURL(file);
            const img = new Image();

            img.onload = () => {
                if (img.width <= 1080 && img.height <= 1080) {
                    result.push({
                        id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                        blob: url,
                        file: file,
                        corporate: "",
                        error: 200
                    });
                } else {
                    result.push({
                        id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                        blob: null,
                        file: null,
                        corporate: "",
                        error: 302
                    });
                }
                setData((prevData: any) => [...prevData, ...result]);
            };

            img.onerror = () => {
                result.push({
                    id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                    blob: null,
                    file: null,
                    corporate: "",
                    error: 303
                });
                setData((prevData: any) => [...prevData, ...result]);
            };

            img.src = url;
        });

        if (multipleSelect.current) {
            multipleSelect.current.value = "";
        }
    };

    const DeleteItem = (e: any) => {
        const result = Data.filter((f: any) => { return (f.id !== e) });
        setData(result)
    }

    return (
        <>
            <div className="border border-gray-300 rounded-2 p-2">
                <div>
                    {
                        (Data || []).map((d: any, x: number) => {
                            return (
                                <div className={`d-flex w-100 border rounded-1 mb-2 p-2 ${d.error === 301 ? "border-danger" : "border-gray-300"}`}>
                                    {
                                        d.error === 200 &&
                                        <>
                                            <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(d.id) }}>
                                                <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                                            </div>
                                            <div className="w-125px h-100px">
                                                <div className="w-125px h-100px border border-gray-200 rounded-2 background-image-cover" style={{ backgroundImage: `url(${d.blob})` }}></div>
                                            </div>
                                            <div className="w-100 h-100px d-flex align-items-center p-2">
                                                <div className="w-100">
                                                    <div className="d-flex bg-gray-200 h-40px align-items-center p-3 rounded-2 border border-gray-400 mb-1">
                                                        <div className="w-100 d-flex">
                                                            <div className="fw-bolder me-2 fs-7">Piksel</div>
                                                            <div className="fw-semibold fs-7">1080X1080</div>
                                                        </div>
                                                        <div className="w-100 d-flex">
                                                            <div className="fw-bolder me-2 fs-7">Boyut</div>
                                                            <div className="fw-semibold fs-7">12.5MB</div>
                                                        </div>
                                                        <div className="w-100 d-flex">
                                                            <div className="fw-bolder me-2 fs-7">Tür</div>
                                                            <div className="fw-semibold fs-7">PNG</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div className="w-100 me-1">
                                                            <input className="form-control h-40px" placeholder="Sponsor Adı" />
                                                        </div>
                                                        <div className="w-100 ms-1">
                                                            <input className="form-control h-40px" placeholder="Sponsor Web Sitesi" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        d.error === 302 &&
                                        <>
                                            <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(d.id) }}>
                                                <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                                            </div>
                                            <div className="w-100px h-100px border border-gray-200 rounded-2 bg-danger">
                                                <div className="w-100px h-100px d-flex align-items-center justify-content-center">
                                                    <i className="fa-solid fa-images text-white fs-1"></i>
                                                </div>
                                            </div>
                                            <div className="w-100 h-100px d-flex align-items-center p-2">
                                                <div className="w-100">
                                                    <div className="text-start">
                                                        <div className="fw-bold fs-6 mb-1">Dosya Pixel hatası</div>
                                                        <div className="fw-semibold">Dosya Ölçüleri Kare (1080X1080 piksel) olmaıdır.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        d.error === 303 &&
                                        <>
                                            <div className="d-flex ms-3 h-100px align-items-center" onClick={() => { DeleteItem(d.id) }}>
                                                <i className="fa-solid fa-circle-xmark fs-1 cursor-pointer me-2"></i>
                                            </div>
                                            <div className="w-100px h-100px border border-gray-200 rounded-2 bg-danger">
                                                <div className="w-100px h-100px d-flex align-items-center justify-content-center">
                                                    <i className="fa-solid fa-images text-white fs-1"></i>
                                                </div>
                                            </div>
                                            <div className="w-100 h-100px d-flex align-items-center p-2">
                                                <div className="w-100">
                                                    <div className="text-start">
                                                        <div className="fw-bold fs-6 mb-1">Dosya Boyut hatası</div>
                                                        <div className="fw-semibold">Dosya Boyutu 2MB'dan büyük olamaz</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }


                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-100 h-100px d-flex align-items-center justify-content-center border border-gray-300 h-100 rounded-1 p-2 cursor-pointer shadow-sm" onClick={() => { multipleSelect.current.click() }}>
                    <div className="text-center">
                        <i className="fa-regular fa-image fs-1"></i>
                        <div className="fs-7 fw-semibold text-gray-600">Haber İçin Galeri Resimleri Ekleyin</div>
                    </div>
                    <input type="file" onChange={SelectItem} ref={multipleSelect} multiple hidden />
                </div>
            </div>
        </>
    )
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name SingleSelect
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */

interface SingleSelect {
    value?: string
    onChange?: any
    placeholder?: string,
    permissions?: {
        maxWidth?: any,
        maxHeight?: any,
        situation?: any
    }
}
const SingleSelect = ({ value, data = [], column = ["", ""], placeholder, settings = { search: true }, onChange }: { value?: any, data?: any, column?: any, placeholder?: string, settings?: { search: boolean }, onChange?: any }) => {
    const [Show, setShow] = useState(false)
    const [Search, setSearch] = useState("")
    const [Selected, setSelected] = useState<any>({ [column[0]]: null, [column[1]]: null })

    const filteredData = Search.length > 3
        ? data.filter((item: any) => item[column[1]].toLowerCase().includes(Search.toLowerCase()))
        : data;

    useEffect(() => {
        const result = data.filter((f: any) => { return (f[column[0]] === value) })
        if (result.length > 0) {
            setSelected({ [column[0]]: result[0][column[0]], [column[1]]: result[0][column[1]] })
        }
    }, [value])

    return (
        <>
            <div className="position-relative">
                <div className="border border-gray-300 rounded-1 d-flex align-items-center p-3 cursor-pointer bg-white" onClick={() => { setShow((prevState) => !prevState); }} style={{ height: "43.52px" }}>
                    <div className="w-100">
                        {Selected[column[1]] ? Selected[column[1]] : placeholder}
                    </div>
                    <i className="fa-solid fa-angle-down fs-2"></i>
                </div>
                <div className="position-absolute w-100 mt-1 bg-white p-2 shadow-sm  border border-gray-300 rounded-2 bg-white" style={{ zIndex: 10, visibility: Show ? "visible" : "hidden" }}>
                    <div className="h-40px p-1 mb-2 position-relative" hidden={settings.search ? false : true}>
                        <input className="form-control h-40px fs-7" placeholder="Listede Arayın" value={Search} onChange={(e: any) => { setSearch(e.target.value) }} />
                        <i className="fa-solid fa-magnifying-glass position-absolute fs-2" style={{ top: 15, right: 15 }}></i>
                    </div>
                    {
                        data.length > 0 &&
                        <div className=" border rounded-1 border-gray-300">
                            <div className="hover-scroll-overlay-y no-scrool h-200px p-1">
                                {(filteredData || []).map((d: any, x: number) => {
                                    return (
                                        <div
                                            key={x}
                                            className={`card card-body p-2 border border-gray-300 bg-hover-gray-200 cursor-pointer mb-1 ${Selected[column[0]] === d[column[0]] ? "bg-info" : ""}`}
                                            onClick={() => {
                                                setSelected({ [column[0]]: d[column[0]], [column[1]]: d[column[1]] });
                                                onChange(d[column[0]]);
                                                setShow(false);
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className={`w-100 ${Selected[column[0]] === d[column[0]] ? "text-white" : ""}`}>
                                                    {d[column[1]]}
                                                </div>
                                                {Selected[column[0]] === d[column[0]] && (
                                                    <i className={`fa-regular fa-circle-check fs-3 ${Selected[column[0]] === d[column[0]] ? "text-white" : ""}`}></i>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    }
                    {
                        data.length === 0 &&
                        <div className="hover-scroll-overlay-y no-scrool h-175px p-1 d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <i className="fa-regular fa-folder-open fs-3"></i>
                                <div className="w-100 fs-8">Veri Yok</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="drawer-overlay bg-transparent" onClick={() => { setShow((prevState) => !prevState); }} style={{ zIndex: 9, display: Show === true ? "block" : "none" }}></div>
        </>
    )
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name ListerSelect
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */




interface ListerSelect {
    data?: any
    value?: any
    onChange?: any
    placeholder?: string,
    columns?: any
    settings?: {
        conteinerClass?: any
        search?: boolean
    },
    permissions?: {
        maxWidth?: any,
        maxHeight?: any,
        situation?: any
    }
}
const ListerSelect = ({ data, value, onChange, placeholder, columns = ["", "", ""], permissions = { maxWidth: "", maxHeight: "", situation: "" }, settings = { conteinerClass: "h-300px", search: true } }: ListerSelect) => {
    const [Selected, setSelected] = useState<number>(0)

    useEffect(() => {
        setSelected(value)
    }, [value])

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <>



            <div className="border border-gray-300 rounded-2">
                <div className="p-3 pb-0" hidden={settings.search ? false : true}>
                    <input className="form-control" placeholder="Listede Ara..." />
                </div>

                {
                    !showLoader ?
                        <div className={`hover-scroll-overlay-y no-scrool p-2 ${settings.conteinerClass}`}>
                            {

                                (data || []).map((d: any, x: number) => {
                                    return (
                                        <div className={`card mb-1 cursor-pointer bg-hover-gray-200 border border-gray-300 ${Selected === d.id ? "bg-info text-white" : ""}`} onClick={() => { setSelected(d.id === Selected ? 0 : d.id) }}>
                                            <div className="h-45px d-flex align-items-center p-4 fw-bold fs-7">
                                                <div className="w-100">{FlexFunction.capitalize({ text: d[columns[1]] })} {FlexFunction.capitalize({ text: d[columns[2]] })}</div>
                                                <div>{Selected === d.id ? <i className="fa-regular fa-circle-check fs-2 text-white lh-sm"></i> : ""}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        :
                        <div className={"h-150px d-flex align-items-center justify-content-center"}>
                            <div className="text-center">
                                <div className={styles.loaderCompass}></div>
                                <div className="fs-7 fw-semibold">Yükleniyor</div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name VoicePodcast
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */

import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import WaveSurferPlayer, { useWavesurfer } from "@wavesurfer/react";
interface VoicePodcast {

}

const Recorder = ({ onVoice }: { onVoice?: any }) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [record, setRecord] = useState<RecordPlugin | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [progressTime, setProgressTime] = useState("00:00:00");
    const [availableMics, setAvailableMics] = useState<MediaDeviceInfo[]>([]);
    const [selectedMic, setSelectedMic] = useState<string | null>(null);

    const [VoiceUrl, setVoiceUrl] = useState<string | null>(null);

    useEffect(() => {
        const ws = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: "rgb(200, 0, 200)",
            progressColor: "rgb(100, 0, 100)",
        });

        const rec = ws.registerPlugin(
            RecordPlugin.create({
                renderRecordedAudio: false,
                scrollingWaveform: false,
                continuousWaveform: true,
                continuousWaveformDuration: 30,
            })
        );

        rec.on("record-end", (blob: Blob) => {
            const url = URL.createObjectURL(blob);
            setVoiceUrl(url);
        });

        rec.on("record-progress", (time: number) => {
            const hours = Math.floor(time / 3600000);
            const minutes = Math.floor((time % 3600000) / 60000);
            const seconds = Math.floor((time % 60000) / 1000);

            const formattedTime = [hours, minutes, seconds]
                .map((v) => (v < 10 ? "0" + v : v))
                .join(":");

            setProgressTime(formattedTime);
        });

        //setWaveSurfer(ws);
        setRecord(rec);

        RecordPlugin.getAvailableAudioDevices().then((devices) => {
            setAvailableMics(devices);
            if (devices.length > 0) {
                setSelectedMic(devices[0].deviceId);
            }
        });

        return () => {
            ws.destroy();
        };
    }, []);


    const Record = async () => {
        if (!record) return;

        if (isRecording || isPaused) {
            record.stopRecording();
            setIsRecording(false);
            setIsPaused(false);
            return;
        }

        try {
            await record.startRecording({ deviceId: selectedMic! });
            setIsRecording(true);
        } catch (error) {
            console.error("Recording error:", error);
        }
    };

    const Pause = () => {
        if (!record) return;

        if (isPaused) {
            record.resumeRecording();
            setIsPaused(false);
        } else {
            record.pauseRecording();
            setIsPaused(true);
        }
    };


    useEffect(() => {
        onVoice(VoiceUrl)
    }, [VoiceUrl])

    return (
        <>
            <div className="row">
                <div className="col-8 mb-2">
                    <Flex.Select.Single
                        data={availableMics}
                        column={["deviceId", "label"]}
                        placeholder="Ses Aygıtı Seçin"
                        settings={{ search: false }}
                        onChange={(e: any) => { setSelectedMic(e) }}
                    />
                </div>
                <div className="col-12 mb-1">
                    <div className="border border-gray-300 rounded-1 p-2 position-relative d-flex align-items-center justify-content-center">
                        <div ref={containerRef} className="w-full h-100 w-100" />
                        <i className="fa-solid fa-microphone position-absolute fs-3hx text-gray-400" ></i>
                    </div>
                </div>

                <div className="col-12 mb-2
                ">
                    <div className="w-100 d-flex justify-content-center me-3 h-20px">
                        <p className="text-gray-600 fs-5 fw-semibold" >{progressTime}</p>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button className={`d-flex align-items-center justify-content-center p-0 border border-info text-info fw-bold me-2 w-45px h-45px bg-white`} style={{ borderRadius: "100%" }} onClick={Record}>
                        {isRecording ? <i className="fa-solid fa-stop fs-4 text-info"></i> : <i className="fa-solid fa-microphone fs-4 text-info"></i>}
                    </button>
                    <button className={`${isRecording ? "d-flex" : "d-none"} align-items-center justify-content-center p-0 border border-info text-info fw-bold me-2 w-45px h-45px bg-white`} style={{ borderRadius: "100%" }} onClick={Pause}>
                        {isPaused ? <i className="fa-solid fa-microphone fs-4 text-info"></i> : <i className="fa-solid fa-pause fs-4 text-info"></i>}
                    </button>
                </div>
            </div>

        </>
    )
}
const Player = ({ voice, onDelete }: { voice?: any, onDelete?: any }) => {

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<number | null>(null);

    const playContainer = useRef<HTMLDivElement | null>(null);
    const { wavesurfer, isReady } = useWavesurfer({
        container: playContainer,
        waveColor: "gray",
        progressColor: "blue",
        barWidth: 2,
        barGap: 3,
        barRadius: 2,
        height: 100,
        url: voice,
    });

    useEffect(() => {
        if (wavesurfer && isReady) {
            setDuration(wavesurfer.getDuration());
            const interval = setInterval(() => {
                setCurrentTime(wavesurfer.getCurrentTime());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [wavesurfer, isReady]);

    return (
        <>
            <div hidden={voice ? false : true}>
                <div className="w-full p-4 bg-gray-100 rounded-lg">
                    <div className="border border-gray-300 rounded-1 p-2 mb-2">
                        <div ref={playContainer} className="w-full" />
                    </div>
                    <div className="d-flex">
                        <div className="d-flex me-2">
                            <button className={`d-flex align-items-center justify-content-center p-0 border border-info text-info fw-bold me-2 w-45px h-45px bg-white`} style={{ borderRadius: "100%" }} onClick={() => {
                                if (wavesurfer && isReady) {
                                    wavesurfer.playPause();
                                    setPlaying(!playing);
                                }
                            }}>
                                {playing ? <i className="fa-solid fa-pause text-info"></i> : <i className="fa-solid fa-play text-info"></i>}
                            </button>
                            <button className={`align-items-center justify-content-center p-0 border border-info text-info fw-bold me-2 w-45px h-45px bg-white`} style={{ borderRadius: "100%" }} onClick={onDelete}>
                                <i className="fa-solid fa-trash fs-4 text-info mt-1"></i>
                            </button>
                        </div>
                        <div className="w-100">
                            {currentTime !== null && duration !== null && (
                                <div className=" d-flex align-items-center h-50px ">
                                    <div className="w-100 fs-5 fw-semibold">{formatTime(currentTime)}</div>
                                    <div className="w-100 fs-5 fw-semibold d-flex justify-content-end">{formatTime(duration)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const Upload = () => {

    const selectref: any = useRef(null);
    const [selected, setselected] = useState<any>({ blob: null, file: null, error: 0 });


    const select = async (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        if (file) {
            const blob = URL.createObjectURL(file);
            setselected({ blob: blob, file: file, error: 200 });
        }
        if (selectref.current) {
            selectref.current.value = "";
        }
    };

    console.log(selected)

    return (
        <>
            <div className="border border-gray-300 rounded-2 p-2 mb-2">
                <div className={`${selected && (selected.error === 301 || selected.error === 302) ? "border-danger" : ""} h-50px d-flex align-items-center justify-content-center background-image-cover`} style={{ backgroundImage: `url(${selected && selected.blob})`, backgroundColor: `${selected && (selected.error === 301 || selected.error === 302) ? "#f8285a2e" : "#fff"}` }}>
                    <div className={`fs-7 ${selected ? "d-none" : "d-flex"} align-items-center border border-gray-300 p-2 rounded-2 bg-white fw-semibold cursor-pointer`} onClick={() => { selectref.current.click(); }}>
                        <i className="fa-solid fa-microphone fs-1 me-2 text-gray-600"></i>
                        <div className="fs-7 fw-bold text-gray-600">Ses Dosyası</div>
                    </div>

                    {
                        <>
                            <div className="d-flex">
                                <div className={`fs-7 ${selected ? "d-flex" : "d-none"} align-items-center border border-gray-300 p-2 rounded-2 bg-white fw-semibold cursor-pointer me-2`} onClick={() => { setselected(null) }}>
                                    <i className="fa-regular fa-circle-xmark fs-1"></i>
                                </div>
                                <div className={`fs-7 ${selected ? "d-flex" : "d-none"} border border-gray-300 p-2 rounded-2 bg-white fw-semibold cursor-pointer`} onClick={() => { selectref.current.click(); }}>
                                    <i className="fa-solid fa-arrows-rotate fs-1"></i>
                                </div>
                            </div>
                        </>
                    }


                </div>
                <input type="file" ref={selectref} onChange={select} hidden />
            </div >

        </>
    )

}
function formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
const VoicePodcast = () => {
    const [VoiceUrl, setVoiceUrl] = useState<string | null>(null);

    return (
        <div className="p-4">
            {
                VoiceUrl ?
                    <>
                        <Player voice={VoiceUrl} onDelete={() => { setVoiceUrl(null) }} />
                    </>

                    :
                    <>
                        <Upload />
                        <Recorder onVoice={(e: any) => { setVoiceUrl(e) }} />
                    </>

            }


        </div>
    );

}







/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name DatePicker
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface DatePicker {
    value?: any
    onChange?: any
}
const DatePicker = ({ value, onChange }: DatePicker) => {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const days = ["Pts", "Sal", "Çar", "Per", "Cm", "Cts", "Paz"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const [Selected, setSelected] = useState<string>("")

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
    };

    const next = () => {
        setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
        setCurrentMonth((currentMonth + 1) % 12);
    };

    const previous = () => {
        setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
        setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    };

    const daysInMonth = (iMonth: any, iYear: any) => {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    };


    const onSelected = (day: any, month: any, year: any) => {
        let d = day > 9 ? day : `0${day}`
        let m = (month + 1) > 9 ? (month + 1) : `0${(month + 1)}`
        onChange(d, m, year)
        setSelected(`${d}.${m}.${year}`)
        setShow(false)
    }

    const showCalendar = (month: any, year: any) => {
        const first = (new Date(year, month, 1).getDay() + 6) % 7;
        const current = daysInMonth(month, year);

        const calendarBody = Array.from({ length: 6 }, (_, rowIndex) => {
            const row = Array.from({ length: 7 }, (_, index) => {
                const dayIndex = rowIndex * 7 + index;
                const date = dayIndex - first + 1;

                const selectedDate = new Date(year, month, date);
                const isBeforeToday = selectedDate < today;

                const currentDay = today.getDate() === date && year === today.getFullYear() && month === today.getMonth()

                if (rowIndex === 0 && index < first) {
                    const prevMonthDate = daysInMonth(month === 0 ? 11 : month - 1, month === 0 ? year - 1 : year) - first + index + 1;
                    return (
                        <td key={`previus-${index}`}>
                            <div
                                onClick={() => { }}
                                style={{
                                    width: "14,28571428571429%",
                                    opacity: 0.5,
                                    cursor: "not-allowed",
                                }}
                                className="d-flex align-items-center justify-content-center fs-14 cursor-pointer h-40px border border-gray-400 rounded-3 fs-8 fw-bold"
                            >
                                {prevMonthDate}
                            </div>
                        </td>
                    );
                } else if (date > current) {
                    return (
                        <td key={`next-${index}`}>
                            <div
                                onClick={() => {
                                    !isBeforeToday && onSelected(date - current, (month + 1), year)
                                }}
                                style={{
                                    width: "14,28571428571429%",
                                    opacity: isBeforeToday ? 0.5 : 1,
                                    cursor: isBeforeToday ? "not-allowed" : "pointer",

                                }}
                                className={`
                                    d-flex align-items-center justify-content-center fs-14 cursor-pointer rounded-3 h-40px border border-gray-400 fs-8 fw-bold 
                                    ${!isBeforeToday ? "bg-hover-info text-hover-white" : ""}
                                    `}
                            >
                                {date - current}
                            </div>
                        </td>
                    );
                } else {
                    return (
                        <td key={`current-${index}`}>
                            <div
                                onClick={() => {
                                    !isBeforeToday && onSelected(date, (month + 1), year)
                                }}
                                style={{
                                    width: "14,28571428571429%",
                                    opacity: isBeforeToday ? 0.5 : 1,
                                    cursor: isBeforeToday ? "not-allowed" : "pointer",
                                }}
                                className={`
                                    d-flex align-items-center justify-content-center fs-14 rounded-3 h-40px border border-gray-400 fs-8 fw-bold 
                                    ${currentDay ? "bg-info text-white" : ""}
                                    ${!isBeforeToday ? "bg-hover-info text-hover-white" : ""}
                                    
                                    `}
                            >
                                {date}
                            </div>
                        </td>
                    );
                }
            });
            return <tr key={rowIndex}>{row}</tr>;
        });

        return calendarBody;
    };

    useEffect(() => {
        setSelected(value)
    }, [value])

    const [Show, setShow] = useState(false);
    return (
        <>
            <div className="position-relative">
                <div className="mb-2">
                    <input
                        value={Selected}
                        className="form-control cursor-pointer"
                        readOnly
                        onClick={() => { setShow(Show ? false : true) }}
                        placeholder="gg.aa.yyyy"
                    />
                </div>
                <i className="fa-regular fa-calendar-days position-absolute fs-2" style={{ position: "absolute", top: 13, right: 13 }}></i>
                <div className="pt-0 position-absolute bg-white border border-gray-300 rounded-2 w-100" style={{ visibility: Show ? "visible" : "hidden", zIndex: 110 }}>
                    <div className="p-3 pt-2 pb-1">
                        <div className="row p-2">
                            <div className="col-lg-12 p-0 mb-2">
                                <div className="d-flex">
                                    <div className="w-25px me-1">
                                        <div className="btn-sm d-flex align-items-center justify-content-center cursor-pointer w-25px h-30px border border-info  rounded-3" onClick={previous}>
                                            <i className="fa-solid fa-chevron-left text-info"></i>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center me-1">
                                        <div className="btn-sm d-flex align-items-center justify-content-center cursor-pointer w-100 border border-info rounded-3" onClick={handleTodayClick}>
                                            <div className="text-info fw-bold">{currentYear}</div>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center me-1">
                                        <div className=" btn-sm d-flex align-items-center justify-content-center cursor-pointer w-100 border border-info rounded-3" onClick={handleTodayClick}>
                                            <div className="text-info fw-bold">Bu Gün</div>
                                        </div>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center me-1">
                                        <div className="btn-sm d-flex align-items-center justify-content-center cursor-pointer w-100 border border-info rounded-3" onClick={handleTodayClick}>
                                            <div className="text-info fw-bold">{months[currentMonth]}</div>
                                        </div>
                                    </div>
                                    <div className="w-25px d-flex justify-content-end">
                                        <div className="btn-sm d-flex align-items-center justify-content-center cursor-pointer w-25px h-30px border border-info rounded-3 rounded-3" onClick={next}>
                                            <i className="fa-solid fa-chevron-right text-info"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 p-0">
                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            {days.map((day, index) => (
                                                <th key={index}>
                                                    <div
                                                        style={{ width: "14,28571428571429%" }}
                                                        className="h-40px border border-gray-400 d-flex align-items-center justify-content-center rounded-3 fs-8 bg-gray-300"
                                                    >
                                                        {day}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="mt-2">
                                        {showCalendar(currentMonth, currentYear)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-overlay bg-transparent" onClick={() => { setShow(Show ? false : true) }} style={{ zIndex: 109, display: Show === true ? "block" : "none" }}></div>
        </>
    );
}






/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name ColorPicker
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface ColorPicker {

}
const ColorPicker = () => {


    return (
        <>

        </>
    )
}




/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Tagger
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface Tagger {

}
const Tagger = ({
    value,
    onChange,
    placeholder

}: {
    value?: any,
    onChange?: any,
    placeholder?: any
}) => {

    const [Data, setData] = useState<any>([])
    const [Value, setValue] = useState<any>()

    const InsertItem = () => {
        if (Value === "") {
            toast("Kelime Girmediniz")
        } else {
            const result = [...Data, { id: Math.random().toString(36).substring(2, 10).toLowerCase(), keywords: Value }]
            setValue("")
            setData(result)
            onChange(result)
        }
    }
    const DeleteItem = (id: any) => {
        const result = Data.filter((d: any) => { return (d.id !== id) })
        setValue("")
        setData(result)
        onChange(result)
    }

    return (
        <>
            <div className="form-group">
                <div className="d-flex">
                    <div className="w-100 me-2">
                        <input
                            className="form-control mb-2"
                            placeholder={placeholder}
                            value={Value}
                            onKeyUp={(e?: any) => { e.key === "Enter" && InsertItem() }}
                            onChange={(e: any) => { setValue(e.target.value) }}
                        />
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="fw-semibold me-1 ms-1 text-gray-700">/</div>
                    </div>
                    <div className="ms-2">
                        <button className="btn btn-secondary border border-gray-400 w-225px d-flex align-items-center justify-content-center">
                            <i className="fa-solid fa-microchip fs-3"></i>
                            <div className="ms-0 me-2 fs-7">Anahtar Kelime Oluştur</div>
                        </button>
                    </div>
                </div>



                <div className={`border border-gray-300 min-h-100px rounded-2 p-2 ${Data.length !== 0 ? " d-flex" : "d-none"}`} style={{ flexWrap: "wrap" }}>
                    {
                        Data.length > 0 &&
                        (Data || []).map((d: any, x: number) => {
                            return (
                                <div className="min-100 border border-gray-300 h-35px rounded-2 d-flex align-items-center p-3 me-2" key={`tags-list-${x}`}>
                                    <div className="w-100 me-3">{d.keywords}</div>
                                    <i className="fa-solid fa-circle-xmark fs-2 cursor-pointer" onClick={() => { DeleteItem(d.id) }}></i>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={`border border-gray-300 min-h-100px rounded-2 p-2 h-100px w-100 justify-content-center align-items-center ${Data.length === 0 ? " d-flex" : "d-none"}`}>
                    <div className="text-center">
                        <i className="fa-solid fa-tags fs-1"></i>
                        <div className="fs-7 text-gray-600 fw-bold">Anahtar Kelimeler</div>
                    </div>
                </div>
            </div>

        </>
    )
}


/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Youtuber
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface Youtuber {

}
const Youtuber = () => {

    const [Url, setUrl] = useState<any>("")
    const [UrlDecode, setUrlDecode] = useState<any>(null)
    const VideoDecode = (e: any) => {
        setUrl(e);
        const result = e.replace("https://www.youtube.com/watch?v=", "")
        setUrlDecode(result)
    }

    return (
        <>
            <div>
                <input
                    value={Url}
                    onChange={(e: any) => { VideoDecode(e.target.value) }}
                    className="form-control mb-2"
                    placeholder="Örnek URL; https://www.youtube.com/watch?v=XXXXXXXXX ve benzeri kod içermesi yeterlidir."
                />
                {
                    UrlDecode ?
                        <iframe style={{ width: "100%" }} className="border border-gray-300 rounded-2 p-2 h-500px" src={`https://www.youtube.com/embed/${UrlDecode}`}></iframe>
                        :
                        <div className="border border-gray-300 rounded-2 p-2 h-300px d-flex align-items-center justify-content-center">
                            <div className="text-center">
                                <div>
                                    <i className="fa-brands fa-youtube fs-1"></i>
                                </div>
                                <div className="fs-7 fw-semibold text-gray-600">Haber İçin Video Ekleyin</div>
                            </div>
                        </div>

                }

            </div>

        </>
    )
}



/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Editor
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface Editor {
    value?: any
    title?: any
    style?: {
        height?: string
        radius?: string
    }
    onChange?: any
}
const Editor = ({
    value,
    title = null,
    onChange = () => { },
    style = {
        height: "",
        radius: ""
    }
}: Editor) => {


    const editorRef: any = useRef<any>(null)
    const [loaded, setloaded] = useState<boolean>(false)
    const { CKEditor, ClassicEditor }: any = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setloaded(true)
    }, [])

    function uploadAdapter(loader: any) {

        console.log(loader)
        return {
            upload: () => {
                return new Promise(async (resolve) => {
                    const f = await loader.file;
                    const data = new FormData();
                    data.append('path', "content");
                    data.append('file', f);
                    resolve({
                        default: ``
                    });
                })
            },
            abort: () => { }


        }
    }

    return (
        <>
            {
                loaded &&
                <div>
                    {title && <label className="fs-6 fw-semibold text-gray-500 h-20px">{title}</label>}
                    <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        onChange={(event: any, editor: any) => { onChange(editor.getData()) }}
                        onReady={(editor: any) => {
                            editor.editing.view.change((writer: any) => {
                                writer.setStyle("min-height", style.height, editor.editing.view.document.getRoot());
                                writer.setStyle("border-radius", style.radius, editor.editing.view.document.getRoot());
                                writer.setStyle("font-size", "16px", editor.editing.view.document.getRoot())
                            });
                            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => { return uploadAdapter(loader); };
                        }}
                    />
                </div>
            }
        </>
    )
}




/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Eventer
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface Eventer {

}
const Eventer = () => {
    const ConcertArea = [
        { "id": 1, "name": "Opernhaus Zürich" },
        { "id": 2, "name": "Victoria Hall" },
        { "id": 3, "name": "Tonhalle Zürich" },
        { "id": 4, "name": "Grand Théâtre de Genève" },
        { "id": 5, "name": "Kongresshaus Zürich" },
        { "id": 6, "name": "Stadtcasino Basel" },
        { "id": 7, "name": "Salle Métropole" },
        { "id": 8, "name": "Lugano Arte e Cultura (LAC)" },
        { "id": 9, "name": "Palais de Beaulieu" },
        { "id": 10, "name": "Kultur- und Kongresszentrum Luzern" },
        { "id": 11, "name": "Kultur- und Kongresszentrum Thun" },
        { "id": 12, "name": "Tonhalle St. Gallen" },
        { "id": 13, "name": "Kongresshaus Biel" },
        { "id": 14, "name": "Konzertsaal Solothurn" },
        { "id": 15, "name": "Auditorio Stelio Molo" }
    ]
    return (
        <>
            <div className="row mt-4">

                <div className="col-12">
                    <div className="row">

                        <div className="col-6 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Sanatçı:</label>
                            <input className="form-control" placeholder="Tarkan, Doğuş veya Cem Andrian" />
                        </div>
                        <div className="col-12 mb-2"></div>
                        <div className="col-6 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Organizatör:</label>
                            <input className="form-control" placeholder="Etkinliği Organize Eden Firma Adı" />
                        </div>
                        <div className="col-6 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Web Sitesi:</label>
                            <input className="form-control" placeholder="Web Sitesi" />
                        </div>
                        <div className="col-12 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Bilet Satış Linki:</label>
                            <input className="form-control" placeholder="Bilet Satış Linki örn:https://www.eventim-light.com/ch/a/65e1e63d7fe17c...." />
                        </div>

                        <div className="col-12 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Konser Hakkında:</label>
                            <Editor />
                        </div>

                        <div className="col-6 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Konser Tarihi:</label>
                            <Flex.Picker.Date value={"12.02.2024"} onChange={(e: any) => { }} />
                        </div>
                        <div className="col-6"></div>
                        <div className="col-6">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Açılış:</label>
                            <div className="d-flex">
                                <div className="w-100">
                                    <Flex.Select.Single
                                        data={Array.from({ length: 24 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                        column={["id", "value"]}
                                        placeholder="Saat"
                                        settings={{ search: false }}
                                    />
                                </div>
                                <div className="me-2 ms-2 d-flex align-items-center justify-content-center">
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
                        <div className="col-6">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Başlangıç:</label>
                            <div className="d-flex">
                                <div className="w-100">
                                    <Flex.Select.Single
                                        data={Array.from({ length: 24 }, (_, i) => ({ id: `${i < 10 ? 0 : ""}${i + 1}`, value: `${i < 10 ? 0 : ""}${i + 1}` }))}
                                        column={["id", "value"]}
                                        placeholder="Saat"
                                        settings={{ search: false }}
                                    />
                                </div>
                                <div className="me-2 ms-2 d-flex align-items-center justify-content-center">
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

                        <div className="col-12 mb-5"></div>

                        <div className="col-4">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Konser Yeri:</label>
                            <Flex.Select.Single
                                data={ConcertArea}
                                column={["id", "name"]}
                                placeholder="Konser Alanı Seç"
                                settings={{ search: false }}
                            />
                        </div>

                        <div className="col-12 mb-2">
                            <Mapper />
                        </div>

                        <div className="col-12">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Sponsorlar:</label>
                            <Flex.Upload.Sponsors />
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}





/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Mapper
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface Mapper {

}
const Mapper = () => {

    return (
        <>
            <div className="row mt-4">
                <div className="col-12">

                </div>
                <div className="col-12 mb-2">
                    <input className="form-control" placeholder="Google Map Yerleştirme Kodunuz" />
                </div>
                <div className="col-12 mb-2">
                    <div className="h-200px border border-gray-300 rounded-2 d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <i className="fa-solid fa-map-location-dot fs-1"></i>
                            <div className="fs-6">Google Map Yerleştirme Kodunuz</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Documenter
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */

interface Documenter {

}
const Documenter = () => {

    return (
        <>
            <div className="row mt-4">

                <div className="col-12">

                </div>
                <div className="col-12 mb-2">
                    <input className="form-control" placeholder="Google Map Yerleştirme Kodunuz" />
                </div>



            </div>
        </>
    )
}


/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Search
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */

interface Search {
    SearchSession?: any,
    onChange?: any,
}

const Search = ({ SearchSession, onChange }: Search) => {

    const [Open, setOpen] = useState<boolean>(false)
    const [Value, setValue] = useState<string>("")


    const [SearchLogs, setSearchLogs] = useState<any>([])
    const GetSearchLog = () => {
        const result = window.localStorage.getItem(SearchSession)
        if (result) {
            const r = JSON.parse(result)
            setSearchLogs(r)
        }
    }

    const SetSearchLog = (e: any) => {
        const result = window.localStorage.getItem(SearchSession);
        const r = result ? JSON.parse(result) : [];
        const log = [e, ...r];
        window.localStorage.setItem(SearchSession, JSON.stringify(log));
    }

    const ClearSearchLog = () => {
        window.localStorage.removeItem(SearchSession);
        setSearchLogs([])
        setOpen(false);
    }

    return (
        <>

            <div className="w-100 position-relative" style={{ zIndex: Open ? 110 : 0 }}>
                <input
                    style={{ paddingRight: 40 }}
                    className="form-control"
                    placeholder="Aramak İçin Haber Başlığı Girin."
                    value={Value}
                    onKeyDown={(e: any) => {
                        e.key === "Enter" && (
                            Value.length > 0 && (
                                onChange(e.target.value),
                                SetSearchLog(e.target.value)
                            )
                        )
                    }}
                    onChange={(e: any) => {
                        setValue(e.target.value);
                        setOpen(false);
                        e.target.value.length === 0 && onChange("")
                    }}
                    onClick={() => {
                        SearchLogs.length > 0 && setOpen(true);
                        GetSearchLog()
                    }}
                />
                {
                    Value.length > 0 ?
                        <i className="fa-regular fa-circle-xmark position-absolute fs-2 cursor-pointer" style={{ top: 12, right: 12 }} onClick={() => { setValue(""); onChange() }}></i>
                        :
                        <i className="fa-solid fa-magnifying-glass position-absolute fs-2 cursor-pointer" style={{ top: 12, right: 12 }}></i>
                }
                <div className={`card position-absolute bg-white w-100 mt-1 rounded-2 shadow-sm `} style={{ visibility: Open ? "visible" : "hidden", zIndex: Open ? 110 : 0 }}>
                    <div className="card-header p-5 pt-2 pb-2 min-h-20px d-block">
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                                <div className="fw-semibold">Geçmiş Aramalarım</div>
                            </div>
                            <div className="w-100 d-flex align-items-center justify-content-end cursor-pointer" onClick={() => { ClearSearchLog() }}>
                                <i className="fa-solid fa-broom me-2"></i>
                                <div className="fw-semibold">
                                    Tümü Temizle
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-4 hover-scroll-overlay-y h-250px no-scrool">
                        {
                            (SearchLogs || []).map((d: any, x: number) => {
                                return (
                                    <div className="card card-body h-auto p-1 mb-2 cursor-pointer" onClick={() => { setValue(d); onChange(d); setOpen(false) }}>
                                        <div className="d-flex">
                                            <div className="me-1 h-40px d-flex align-items-center ms-2">
                                                <i className="fa-solid fa-clock-rotate-left fs-4"></i>
                                            </div>
                                            <div className="w-100 h-40px d-flex align-items-center">
                                                <div>
                                                    <div className="fs-7 fw-semibold lh-sm">{d}</div>
                                                </div>
                                            </div>

                                            <div className="ms-5 h-40px d-flex align-items-center">
                                                <i className="fa-solid fa-broom fs-4"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }




                    </div>
                </div>

            </div>

            <div className="drawer-overlay" onClick={() => { setOpen(false) }} style={{ zIndex: 109, display: Open ? "block" : "none", backgroundColor: "transparent" }}></div>
        </>
    )

}



/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Imager
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */

interface Imager {
    src?: string
    className?: string
    width?: string
    height?: string
}
const Imager = ({ src = "", className = "", width = "w-150px", height = "h-85px" }: Imager) => {

    const [Status, setStatus] = useState<number>(0)
    const OnLoad = (e: any) => {
        setStatus(200)
    }
    const OnError = (e: any) => {
        setStatus(301)
    }
    return (
        <>


            {
                Status === 0 &&
                <div className={`${width} ${height} bg-gray-100 border border-gray-300 rounded-2 background-image-cover d-flex align-items-center justify-content-center`}>
                    <div className={styles.loaderCompass}></div>
                </div>

            }
            {
                Status === 200 &&
                <div className={`${width} ${height} bg-gray-200 border border-gray-400 rounded-2 background-image-cover`} style={{ backgroundImage: `url(${src})`, backgroundSize: "contain" }}>
                </div>
            }
            {
                Status === 301 &&
                <div className={`${width} ${height} bg-gray-100 border border-gray-300 rounded-2 background-image-cover d-flex align-items-center justify-content-center`}>
                    <i className="fa-solid fa-image fs-1 text-gray-500"></i>
                </div>
            }
            <img src={src} width={100} onLoad={OnLoad} onError={OnError} style={{ position: "absolute", visibility: "hidden" }} />

        </>
    )

}



/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Charter
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */

interface Charter {
    data?: any
    type?: string
}

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Charter = ({ data, type = "mounth" }: Charter) => {

    const day = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
    const week = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    const month = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const TypeView = (e: any) => {
        if (e === "day") return day;
        if (e === "week") return week;
        if (e === "mounth") return month;
        return [];
    }
    const TypeData = (e: any) => {
        if (e === "day" || e === "week" || e === "mounth") {
            return TypeView(e).map((label: string) => {
                const found = data.find((item: any) => item.label === label);
                return found ? found.value : 0;
            });
        }
        return [];
    };



    const content = {
        labels: TypeView(type),
        datasets: [
            {
                label: "",
                data: TypeData(type),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0)",
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "" },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
        },
    };
    return (
        <Line data={content} options={options} className="border border-gray-300 m-0 p-5 w-100 h-100 rounded-2 bg-white" />
    );

}



/**
 * 
 * 
 * 
 * @version 3.1.1-2025
 * @name Dropper
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */

interface Dropper {
    data?: any
    onChange?: any
}
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const DNDMain = ({ data, onChange }: { data: any[]; onChange: (newData: any[]) => void }) => {








    return "";
    //return <Sortable data={data} />;
};

// DND Container
const DNDContainer = ({ children }: { children: React.ReactNode }) => {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};


const Dropper = {
    DNDMain,
    DNDContainer
};











export const Flex = {
    Upload: {
        Single: SingleUpload,
        Galery: GaleryUpload,
        Sponsors: SponsoredUpload
    },
    Select: {
        Single: SingleSelect,
        Multiple: ListerSelect,
    },
    VoicePodcast,
    Picker: {
        Date: DatePicker,
        Color: ColorPicker
    },
    Tagger,
    Youtuber,
    Editor,
    Eventer,
    Mapper,
    Documenter,
    Search,
    Imager,
    Charter,
    Dropper
};









/*



    const Cards = ({ item, index, moveCard }: any) => {
        const ref = useRef<HTMLDivElement>(null);

        const [{ isDragging }, drag] = useDrag({
            type: "list",
            item: { index, id: item.id },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: "list",
            hover: (draggedItem: { index: number }) => {
                if (draggedItem.index !== index) {
                    moveCard(draggedItem.index, index);
                    draggedItem.index = index;
                }
            },
        });

        drag(drop(ref));

        //const hasSubcategories = data.some((d: any) => d.pid === item.id);

        return (
            <div
                ref={ref}
                className="card card-body pt-3 pb-3 p-4 mb-3"
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: "grab",
                    background: "white",
                    border: "1px solid #ddd",
                }}
            >
                <div className="d-flex align-items-center h-30px">
                    <div className="w-100">
                        <div className="fs-7 fw-semibold lh-sm">{item.name}</div>
                    </div>
                    <div>
                        {
                            //hasSubcategories && <i className="fa-solid fa-angle-right fs-3 lh-sm"></i>
                        }
                    </div>
                </div>
            </div>
        );
    };

    const Sortable = ({ data }: { data: any[] }) => {


        const moveCard = (dragIndex: number, hoverIndex: number) => {
            const updatedData = [...data];
            const [draggedItem] = updatedData.splice(dragIndex, 1); // Öğeyi diziden çıkar
            updatedData.splice(hoverIndex, 0, draggedItem); // Yeni konumuna ekle
            onChange(updatedData); // Güncellenmiş diziyi `onChange` ile aktar
        };

        return (
            <>
                {data.map((item, index) => (
                    <Card key={item.id} item={item} index={index} moveCard={moveCard} />
                ))}
            </>
        );
    };









    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationIdRef = useRef<number | null>(null);

    const drawWave = () => {
        if (!analyserRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        if (!canvasCtx) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const draw = () => {
            analyserRef.current!.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = "rgb(241 241 244)";
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 1.5;
            canvasCtx.strokeStyle = "blue";
            canvasCtx.beginPath();
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();

            animationIdRef.current = requestAnimationFrame(draw);
        };
        draw();
    };
    const startRecording = async () => {
        setIsRecording(true);
        setAudioUrl(null);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.start();
        drawWave();
    };
    const stopRecording = () => {
        setIsRecording(false);
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                recordedChunksRef.current = [];
            };
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const [PlayStatus, setPlayStatus] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const formatSeconds = (): string => {
        if (audioRef.current) {
            const roundedSeconds = Math.floor(audioRef.current.duration);
            const hours = Math.floor(roundedSeconds / 3600); // 1 saat = 3600 saniye
            const minutes = Math.floor((roundedSeconds % 3600) / 60); // 1 dakika = 60 saniye
            const remainingSeconds = roundedSeconds % 60;
            if (hours > 0) {
                return `0${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
            } else {
                return `0${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
            }
        } else {
            return "00:00"
        }
    };
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const handleAudioEnd = () => {
                setPlayStatus(false)
                audioElement.pause();
            };
            audioElement.addEventListener("ended", handleAudioEnd);
            return () => {
                audioElement.removeEventListener("ended", handleAudioEnd);
            };
        }
    }, [audioRef]);


    const handlePlay = () => {
        if (audioRef.current) {
            setPlayStatus(true)
            audioRef.current.play();
        }
    };
    const handleStop = () => {
        if (audioRef.current) {
            setPlayStatus(false)
            audioRef.current.pause();
        }
    };


    useEffect(() => {
        //startRecording()
    }, [])


    return (
        <div>
            <div>
                <div className="h-100px d-flex align-items-center justify-content-center position-relative">
                    <canvas ref={canvasRef} width={600} height={80} className="border border-gray-300 w-100 rounded-2 bg-light-info position-absolute" />
                    {
                        isRecording ?
                            <div
                                onClick={stopRecording}
                                className="h-30px d-flex align-items-center justify-content-center cursor-pointer position-absolute bg-danger"
                                style={{ zIndex: 1050, borderRadius: 8 }}
                            >
                                <i className="fa-solid fa-circle-stop text-white fs-4 ms-3 me-2"></i>
                                <div className="me-3 fw-bold text-white">Kaydı Bitir</div>
                            </div>
                            :
                            <div className="d-flex justif-content-center">
                                <div onClick={startRecording} className="h-30px d-flex align-items-center justify-content-center cursor-pointer bg-info me-2" style={{ zIndex: 1050, borderRadius: 8 }} >
                                    {
                                        audioUrl ?
                                            <i className="fa-solid fa-rotate-right text-white fs-4 ms-3 me-2"></i>
                                            :
                                            <i className="fa-solid fa-circle-play text-white fs-4 ms-3 me-2"></i>
                                    }
                                    {
                                        audioUrl ?
                                            <div className="me-3 fw-bold text-white">Tekrar Kaydet</div>
                                            :
                                            <div className="me-3 fw-bold text-white">Kayda Başla</div>
                                    }
                                </div>
                                {
                                    audioUrl &&
                                    <div onClick={() => {
                                        setAudioUrl(null);
                                        canvasRef.current = null
                                        audioRef.current = null
                                        drawWave();

                                    }} className="h-30px d-flex align-items-center justify-content-center cursor-pointer bg-danger me-2" style={{ zIndex: 1050, borderRadius: 8 }} >
                                        <i className="fa-solid fa-trash text-white fs-4 ms-3 me-2"></i>
                                        <div className="me-3 fw-bold text-white">Sil</div>
                                    </div>
                                }

                            </div>
                    }
                </div>
                {audioUrl && (
                    <div className="mt-5">
                        <audio ref={audioRef} src={audioUrl} controls className="w-100" />
                        <div className="d-none align-items-center">
                            {
                                !PlayStatus ?
                                    <i className="fa-solid fa-play fs-2hx me-4 text-gray-600" onClick={() => { handlePlay(); }}></i>
                                    :
                                    <i className="fa-solid fa-pause fs-2hx me-10 text-gray-600" onClick={() => { handleStop(); }}></i>
                            }

                            <i className="fa-solid fa-arrows-rotate fs-2hx text-gray-600" onClick={() => { }}></i>
                            <input type="range" className="w-100 me-2 ms-2 text-gray-600" min={0} />
                            <div>{formatSeconds()}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    */