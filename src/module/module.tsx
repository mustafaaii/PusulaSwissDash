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

import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"



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
    permissions?: {
        maxWidth?: any,
        maxHeight?: any,
        situation?: any
    }
}

const SingleUpload = ({ value, onChange, placeholder, permissions = { maxWidth: "", maxHeight: "", situation: "" } }: SingleUpload) => {
    const selectref: any = useRef(null);
    const [selected, setselected] = useState<any>({ blob: null, file: null, error: 0 });

    const size = (fileSize: number) => {
        // Örnek: Dosya boyutu sınırı (2 MB)
        return fileSize <= 2 * 1024 * 1024;
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

    const select = async (e: any) => {
        e.preventDefault();
        const [file] = e.target.files;
        if (file) {
            if (size(file.size)) {
                const isValid = await validateImageDimensions(file, permissions.maxWidth, permissions.maxHeight); // Örnek: Maksimum 1920x1080 çözünürlük
                if (isValid) {
                    const blob = URL.createObjectURL(file);
                    setselected({ blob: blob, file: file, error: 200 });
                    onChange(file);
                } else {
                    setselected({ blob: null, file: null, error: 302 }); // Piksel boyut hatası
                }
            } else {
                setselected({ blob: null, file: null, error: 301 }); // Dosya boyutu hatası
            }
        }
        if (selectref.current) {
            selectref.current.value = "";
        }
    };

    useEffect(() => {
        if (value) {
            setselected({ blob: value, file: null, error: 200 });
        } else {
            setselected(null);
        }
    }, [value]);

    return (
        <>
            <div className="border border-gray-300 rounded-2 p-2">

                <div className={`border ${selected && (selected.error === 301 || selected.error === 302) ? "border-danger" : "border-gray-300"} h-175px d-flex align-items-center justify-content-center background-image-cover`} style={{ backgroundImage: `url(${selected && selected.blob})`, backgroundColor: `${selected && (selected.error === 301 || selected.error === 302) ? "#f8285a2e" : "#fff"}` }}>

                    <div className={`fs-7 ${selected ? "d-none" : "d-flex"} align-items-center border border-gray-300 p-2 rounded-2 bg-white fw-semibold cursor-pointer`} onClick={() => { selectref.current.click(); }}>
                        <i className="fa-regular fa-image fs-3 me-2 text-gray-600"></i>
                        <div className="fs-8 fw-bold text-gray-600">{placeholder}</div>
                    </div>



                    {
                        selected && (
                            <>
                                {
                                    selected.error === 200 &&
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

                                {
                                    selected.error === 301 &&
                                    <>
                                        <div>
                                            <div className="d-flex justify-content-center mb-2">
                                                <div className="btn btn-danger btn-sm p-0 rounded-4 me-1" onClick={() => { setselected(null) }}>
                                                    <div className="d-flex align-items-center h-30px">
                                                        <i className="fa-regular fa-circle-xmark lh-sm text-white me-1 ms-3 fs-5"></i>
                                                        <div className="lh-sm fs-8 me-3">Resmi Sil</div>
                                                    </div>
                                                </div>
                                                <div className="btn btn-primary btn-sm p-0 rounded-4 ms-1" onClick={() => { selectref.current.click(); }}>
                                                    <div className="d-flex align-items-center h-30px">
                                                        <i className="fa-solid fa-rotate lh-sm text-white me-1 ms-3 fs-5"></i>
                                                        <div className="lh-sm fs-8 me-3">Resmi Değiştir</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center border border-danger rounded-1 bg-light-danger cursor-pointer p-1">
                                                <div className="text-center ms-2 me-2">
                                                    <div className="ms-1 me-2 lh-sm text-danger fs-8 mt-2 mb-1">Resim Piksel Boyutu Uyumsuz.</div>
                                                    <div className="ms-1 me-2 lh-sm text-danger fs-8 mt-1 mb-2 fw-bold"> Sizden Beklenen Boyut;</div>
                                                    <div className="d-flex">
                                                        <div className="d-flex">
                                                            <div className="ms-1 me-0 lh-sm text-danger fs-8">Genişlik:</div> <b className="ms-1 me-2 lh-sm text-danger fs-8">{permissions.maxWidth}</b>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="ms-1 me-0 lh-sm text-danger fs-8">Yükseklik:</div> <b className="ms-1 me-2 lh-sm text-danger fs-8">{permissions.maxHeight}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }

                                {
                                    selected.error === 302 &&
                                    <>
                                        <div>
                                            <div className="d-flex justify-content-center mb-2">
                                                <div className="btn btn-danger btn-sm p-0 rounded-4 me-1" onClick={() => { setselected(null) }}>
                                                    <div className="d-flex align-items-center h-30px">
                                                        <i className="fa-regular fa-circle-xmark lh-sm text-white me-1 ms-3 fs-5"></i>
                                                        <div className="lh-sm fs-8 me-3">Resmi Sil</div>
                                                    </div>
                                                </div>
                                                <div className="btn btn-primary btn-sm p-0 rounded-4 ms-1" onClick={() => { selectref.current.click(); }}>
                                                    <div className="d-flex align-items-center h-30px">
                                                        <i className="fa-solid fa-rotate lh-sm text-white me-1 ms-3 fs-5"></i>
                                                        <div className="lh-sm fs-8 me-3">Resmi Değiştir</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-30px d-flex align-items-center justify-content-center border border-danger rounded-4 bg-light-danger cursor-pointer p-1">
                                                <i className="fa-regular fa-circle-question lh-sm mt-1 fs-3 text-danger"></i>
                                                <div className="ms-1 me-2 lh-sm text-danger fs-8"> Resim Piksel Boyutu Çok Büyük</div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        )



                    }

                </div>
                <input type="file" ref={selectref} onChange={select} hidden />
            </div >
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
interface MultipleUpload {

}
const MultipleUpload = () => {
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
        const result = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const url = URL.createObjectURL(file);
            if (size(file.size)) {
                result[i] = {
                    id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                    blob: url,
                    file: file,
                    corporate: "",
                    error: 200
                }
            } else {
                result[i] = {
                    id: Math.random().toString(36).substring(2, 10).toLowerCase(),
                    blob: null,
                    file: null,
                    corporate: "",
                    error: 301
                }
            }
        }
        const res = [...Data, ...result]
        setData(res)
        if (multipleSelect.current) {
            multipleSelect.current.value = ""
        }
    }
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
                                        d.error === 301 ?
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
                                            :
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
                                                        <div>
                                                            <input className="form-control h-40px" placeholder="Referans, Alt metin yada alıntı" />
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
const SingleSelect = ({ data = [], column = ["", ""], placeholder, settings = { search: true } }: { data?: any, column?: any, placeholder?: string, settings?: { search: boolean } }) => {
    const [Show, setShow] = useState(false)
    const [Search, setSearch] = useState("")
    const [Selected, setSelected] = useState<any>({ [column[0]]: null, [column[1]]: null })

    const filteredData = Search.length > 3
        ? data.filter((item: any) => item[column[1]].toLowerCase().includes(Search.toLowerCase()))
        : data;

    return (
        <>
            <div className="position-relative">
                <div className="h-40px border border-gray-300 rounded-1 d-flex align-items-center p-3 cursor-pointer" onClick={() => { setShow((prevState) => !prevState); }}>
                    <div className="w-100">
                        {Selected[column[1]] ? Selected[column[1]] : placeholder}
                    </div>
                    <i className="fa-solid fa-angle-down fs-2"></i>
                </div>
                <div className="position-absolute w-100 mt-1 bg-white p-2 shadow-sm  border border-gray-300 rounded-2 bg-white" style={{ zIndex: 1050, visibility: Show ? "visible" : "hidden" }}>
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
            <div className="drawer-overlay bg-transparent" onClick={() => { setShow((prevState) => !prevState); }} style={{ zIndex: 109, display: Show === true ? "block" : "none" }}></div>
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
const ListerSelect = ({ data, value, onChange, placeholder, permissions = { maxWidth: "", maxHeight: "", situation: "" }, settings = { conteinerClass: "h-300px", search: true } }: ListerSelect) => {

    return (
        <>
            <div className="border border-gray-300 rounded-2">
                <div className="p-3 pb-0" hidden={settings.search ? false : true}>
                    <input className="form-control" placeholder="Listede Ara..." />
                </div>
                <div className={`hover-scroll-overlay-y no-scrool p-2 ${settings.conteinerClass}`}>
                    {(data || []).map((d: any, x: number) => {
                        return (
                            <div className="card mb-1 cursor-pointer bg-hover-gray-200 border border-gray-300">
                                <div className="h-45px d-flex align-items-center p-4 fw-bold fs-7">Kategori Adı</div>
                            </div>
                        );
                    })}


                </div>

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

interface VoicePodcast {

}
const VoicePodcast = () => {
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



    return (
        <div>
            <div>
            </div>
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
    );
}


/**
 * 
 * 
 * @version 3.1.1-2025
 * @name DatePlanner
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 */
interface DatePlanner {

}
const DatePlanner = () => {


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
 * @name DatePicker
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */
interface DatePicker {

}
const DatePicker = () => {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const days = ["Pts", "Sal", "Çar", "Per", "Cm", "Cts", "Paz"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

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

    const showCalendar = (month: any, year: any) => {
        const first = (new Date(year, month, 1).getDay() + 6) % 7; // Pazartesi'nin 0 olduğu gün hesaplaması
        const current = daysInMonth(month, year);

        const calendarBody = Array.from({ length: 6 }, (_, rowIndex) => {
            const row = Array.from({ length: 7 }, (_, index) => {
                const dayIndex = rowIndex * 7 + index;
                const date = dayIndex - first + 1;

                const selectedDate = new Date(year, month, date);
                const isBeforeToday = selectedDate < today;

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
                                onClick={() => { !isBeforeToday && alert(date - current) }}
                                style={{ width: "14,28571428571429%" }}
                                className="d-flex align-items-center justify-content-center fs-14 cursor-pointer rounded-3 h-40px border border-gray-400 fs-8 fw-bold"
                            >
                                {date - current}
                            </div>
                        </td>
                    );
                } else {
                    return (
                        <td key={`current-${index}`}>
                            <div
                                onClick={() => { !isBeforeToday && alert(date) }}
                                style={{
                                    width: "14,28571428571429%",
                                    opacity: isBeforeToday ? 0.5 : 1, // Bugünden önceki günler için opaklık
                                    cursor: isBeforeToday ? "not-allowed" : "pointer", // Seçilemez günler için cursor
                                }}
                                className={`d-flex align-items-center justify-content-center fs-14 rounded-3 h-40px border border-gray-400 fs-8 fw-bold`}
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

    const [Show, setShow] = useState(false);
    return (
        <>
            <div className="position-relative">
                <div className="mb-2">
                    <input
                        className="form-control cursor-pointer"
                        readOnly
                        onClick={() => { setShow((old) => { return (old ? false : true) }) }}
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
            <div className="drawer-overlay bg-transparent" onClick={() => { setShow((prevState) => !prevState); }} style={{ zIndex: 109, display: Show === true ? "block" : "none" }}></div>
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
                <input
                    className="form-control mb-2"
                    placeholder={placeholder}
                    value={Value}
                    onKeyUp={(e?: any) => { e.key === "Enter" && InsertItem() }}
                    onChange={(e: any) => { setValue(e.target.value) }}
                />

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

    const [Url, setUrl] = useState<any>(null)
    const [UrlDecode, setUrlDecode] = useState<any>(null)
    const VideoDecode = (e: any) => {
        setUrl(e);
        const result = e.replace("https://www.youtube.com/watch?v=", "")
        console.log(result)
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

                        <div className="col-4 mb-2">
                            <label className="fs-8 fw-bold mb-1 text-gray-700">Konser Tarihi:</label>
                            <Flex.Picker.Date />
                        </div>

                        <div className="col-8 mb-2">
                            <div className="row">
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
                            </div>
                        </div>

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
                            <Flex.Upload.Multiple />
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
 * @name Planner
 * @description 
 * @copyright Mustafa Işık
 * 
 * 
 * 
 */




export const Flex = {
    Upload: {
        Single: SingleUpload,
        Multiple: MultipleUpload
    },
    Select: {
        Single: SingleSelect,
        Multiple: ListerSelect
    },
    DatePlanner,
    VoicePodcast,
    Picker: {
        Date: DatePicker,
        Color: ColorPicker
    },
    Tagger,
    Youtuber,
    Editor,
    Eventer,
    Mapper
};









