
export const Platforms: IPlatform[] = [
    {
        label: 'youtube',
       img: '../public/images/Youtube.svg'
    },
    {
        label: 'pinterest',
        img: '../public/images/Pinterest.svg'
    },
    {
        label: 'tiktok',
        img: '../public/images/Tiktok.svg'
    },
    {
        label: 'twitch',
        img: '../public/images/Twitch.svg'
    }
]
export let Url: string;
export type ContentType = 'audio' | 'video';

export interface IPlatform {
    label: string;
    img: string;
}
export interface IOption {
    label: string;
    value: string;
}

export const QualityOptions: Record<ContentType, IOption[]> = {
    audio: [
        { label: '320kbps', value: '320kbps' },
        { label: '256kbps', value: '256kbps' },
        { label: '128kbps', value: '128kbps' },
    ],
    video: [
        { label: '1080p', value: '1080p' },
        { label: '720p', value: '720p' },
        { label: '480p', value: '480p' },
    ]
}

export const FormatOptions: Record<ContentType, IOption[]> = {
    audio: [
        { label: 'MP3', value: 'MP3' },
        { label: 'WAV', value: 'WAV' },
    ],
    video: [
        { label: 'MP4', value: 'MP4' },
        { label: 'GIF', value: 'GIF' },
        { label: 'WEBM', value: 'WEBM' },
    ]
}

export interface Duration {
    type: 'full' | 'range',
    start?: number,
    end?: number
}
