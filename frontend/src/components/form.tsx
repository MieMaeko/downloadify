import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Box } from "./box";
import type { ContentType, Duration } from "../data/downloadOptions";
import {
    Platforms,
    Url,
    QualityOptions,
    FormatOptions
} from "../data/downloadOptions";

import "../sass/components/_form.scss";
import { useState } from "react";

type FormData = {
    platform: string;
    url: string;
    contentType: ContentType;
    quality: string;
    format: string;
    duration: Duration;
};

export const Form = () => {
    const { register, control, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues: {
            platform: "youtube",
            url: Url,
            contentType: "video",
            quality: "1080p",
            format: "MP4",
            duration: { type: "full" }
        }
    });

    const selectedContentType = watch("contentType");
    const selectedDuration = watch("duration");
    const [loading, setLoading] = useState(false);



    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/download", data, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                    );
                    console.log(`Download progress: ${percent}%`);
                },
            });

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `video.${data.format.toLowerCase()}`; // Скачать как MP4 или другой формат
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Download failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="topic">
                <label>Select platform</label>
                <div className="boxes">
                    <Controller
                        control={control}
                        name="platform"
                        render={({ field }) => (
                            <>
                                {Platforms.map(p => (
                                    <Box
                                        key={p.label}
                                        label={p.label}
                                        img={p.img}
                                        isSelected={field.value === p.label}
                                        onSelect={() => field.onChange(p.label)}
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="topic">
                <label>Paste URL</label>
                <br />
                <input
                    className="inpUrl"
                    type="text"
                    placeholder="place url"
                    {...register("url", { required: true })}
                />
            </div>

            <div className="topic">
                <label>Media Type</label>
                <div className="boxes">
                    <Controller
                        control={control}
                        name="contentType"
                        render={({ field }) => (
                            <>
                                {["video", "audio"].map(cT => (
                                    <Box
                                        key={cT}
                                        label={cT}
                                        isSelected={field.value === cT}
                                        onSelect={() =>
                                            field.onChange(cT as ContentType)
                                        }
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="topic">
                <label>Format type</label>
                <div className="boxes">
                    <Controller
                        control={control}
                        name="format"
                        render={({ field }) => (
                            <>
                                {FormatOptions[selectedContentType].map(f => (
                                    <Box
                                        key={f.value}
                                        label={f.label}
                                        isSelected={field.value === f.value}
                                        onSelect={() => field.onChange(f.value)}
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="topic">
                <label>Quality Type</label>
                <div className="boxes">
                    <Controller
                        control={control}
                        name="quality"
                        render={({ field }) => (
                            <>
                                {QualityOptions[selectedContentType].map(q => (
                                    <Box
                                        key={q.value}
                                        label={q.label}
                                        isSelected={field.value === q.value}
                                        onSelect={() => field.onChange(q.value)}
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="topic">
                <label>Duration</label>
                <div className="boxes">
                    <Controller
                        control={control}
                        name="duration.type"
                        render={({ field }) => (
                            <>
                                {[
                                    { label: "Full", value: "full" },
                                    { label: "Custom range", value: "range" }
                                ].map(opt => (
                                    <Box
                                        key={opt.value}
                                        label={opt.label}
                                        isSelected={field.value === opt.value}
                                        onSelect={() => {
                                            field.onChange(opt.value);
                                            if (opt.value === "full") {
                                                setValue("duration", {
                                                    type: "full"
                                                });
                                            } else {
                                                setValue("duration", {
                                                    type: "range",
                                                    start: 0,
                                                    end: 0
                                                });
                                            }
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    />
                </div>

                {selectedDuration.type === "range" && (
                    <div className="durations">
                        <div>
                            <label>Start:</label>
                            <input
                                type="number"
                                {...register("duration.start", {
                                    valueAsNumber: true
                                })}
                            />
                        </div>

                        <div>
                            <label>End:</label>
                            <input
                                type="number"
                                {...register("duration.end", {
                                    valueAsNumber: true
                                })}
                            />
                        </div>
                    </div>
                )}
            </div>
            <button disabled={loading}>
                <img src="/images/download.png" alt="down" />
                <span>{loading ? "Downloading..." : "Download"}</span>
            </button>
        </form>
    );
};
