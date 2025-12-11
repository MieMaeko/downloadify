import { useState } from 'react';
import { Box } from './box';
import type { ContentType, Duration } from '../data/downloadOptions';
import { Platforms, Url, QualityOptions, FormatOptions } from '../data/downloadOptions';
import '../sass/components/_form.scss';
export const Form = () => {
    const [selectedPlatform, setSelectPlatform] = useState<string>('youtube');
    const [selectedContentType, setSelectContentType] = useState<ContentType>('video');
    const [selectedQuality, setSelectQuality] = useState<string>('1080p');
    const [selectedFormat, setSelectFormat] = useState<string>('MP4');
    const [selectedDuration, setSelectDuration] = useState<Duration>({ type: 'full' });
    const [typedUrl, setUrl] = useState(Url)
    const sendDonwload = () => {
        const requestData = {
            platform: selectedPlatform,
            format: selectedFormat,
            quality: selectedQuality,
            duration: selectedDuration
        }
    };

    const handleDurationChange = (selectedType: 'full' | 'range') => {
        setSelectDuration(prev => ({
            type: selectedType,
            start: selectedType === 'range' ? prev.start : undefined,
            end: selectedType === 'range' ? prev.end : undefined,
        }))
    }
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDuration(prev => ({
            ...prev,
            start: Number(e.target.value),
        }));
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectDuration(prev => ({
            ...prev,
            end: Number(e.target.value),
        }));
    };

    const durationOptions = [
        { label: 'Full', value: 'full' },
        { label: 'Custom range', value: 'range' },
    ];
    return (
        <form onSubmit={(e) => { e.preventDefault(); sendDonwload() }}>
            <div className='topic'>
                <label htmlFor="">Select platform</label>
                <div className='boxes'>
                    {Platforms.map(p =>
                        <Box
                            key={p.label}
                            label={p.label}
                            img={p.img}
                            isSelected={selectedPlatform === p.label}
                            onSelect={() => setSelectPlatform(p.label)}
                        />)}
                </div>

            </div>
            <div className='topic'>
                <label htmlFor="">Paste url</label>
                <br />
                <input type="text" placeholder='place url'
                    onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className='topic'>
                <label htmlFor="">Media Type</label>
                <div className='boxes'>
                    {['video', 'audio'].map(cT => (
                        <Box
                            key={cT}
                            label={cT}
                            isSelected={selectedContentType === cT}
                            onSelect={() => setSelectContentType(cT as ContentType)} />
                    ))}
                </div>
            </div>
            <div className='topic'>
                <label htmlFor="">Format type</label>
                <div className='boxes'>
                    {FormatOptions[selectedContentType].map(f => (
                        <Box
                            key={f.value}
                            label={f.label}
                            isSelected={selectedFormat === f.value}
                            onSelect={() => setSelectFormat(f.value)}
                        />
                    ))}
                </div>
            </div>


            <div className='topic'>
                <label htmlFor="">Quality Type</label>
                <div className='boxes'>
                    {QualityOptions[selectedContentType].map(q => (
                        <Box
                            key={q.value}
                            label={q.label}
                            isSelected={selectedQuality === q.value}
                            onSelect={() => setSelectQuality(q.value)}
                        />
                    ))}
                </div>
            </div>

            <div className='topic'>
                <label htmlFor="">Duration</label>
                <div className="boxes">
                    {durationOptions.map(option => (
                        <Box
                            key={option.value}
                            label={option.label}
                            isSelected={selectedDuration.type === option.value}
                            onSelect={() => handleDurationChange(option.value as 'full' | 'range')}
                        />
                    ))}
                </div>
                {selectedDuration.type === 'range' && (
                    <div>
                        <div>
                            <label htmlFor="start">Start:</label>
                            <input
                                type="number"
                                id="start"
                                value={selectedDuration.start || ''}
                                onChange={handleStartChange}
                                placeholder="Enter start time"
                            />

                            <label htmlFor="end">End:</label>
                            <input
                                type="number"
                                id="end"
                                value={selectedDuration.end || ''}
                                onChange={handleEndChange}
                                placeholder="Enter end time"
                            />
                        </div>
                    </div>

                )}
            </div>
            <button>
                <img src="../../public/images/download.png" alt="down" />
                <span>Download</span>
            </button>
        </form>
    )
}