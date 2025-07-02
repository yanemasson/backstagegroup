import {getDate} from "../utils/getDate.ts";
import {useState} from "react";
import {Report} from "../types/report.ts";
import Anchor from "./Anchor.tsx";
import Text, {TextVariant} from "./Text.tsx";
import ExpandButton from "./Buttons/ExpandButton.tsx";
import VideoPlayer from "./VideoPlayer/VideoPlayer.tsx";

const ReportComponent = ({report}: {report: Report}) => {
    const dateObj = getDate(report.date);
    const [isOpen, setIsOpen] = useState(false)

    enum Source {
        VK = "VK",
        TG = "TG",
        site = "site",
    }
    const SourceMap = {
        [Source.VK]: {name: "ВК", link: "https://vk.com/backstagegroup"},
        [Source.TG]: {name: "ТГ", link: "https://t.me/backstagegroup24"},
        [Source.site]: {name: "Сайт", link: "/"},
    }
    const SourceLink = ({ source }: {source: Report['source']}) => {
        const sourceInfo = SourceMap[source]
        return (
            <Anchor href={sourceInfo.link}>
                <Text variant={TextVariant.CAPTION}>
                    Источник: {sourceInfo.name}
                </Text>
            </Anchor>
        );
    }

    const truncateToWord = (str: string, maxLength: number) => {
        if (str.length <= maxLength) return str;
        const lastSpace = str.lastIndexOf(' ', maxLength);
        if (lastSpace === -1) return str.slice(0, maxLength);
        return str.slice(0, lastSpace);
    }

    return (
        <div className='flex flex-col gap-5 w-[90vw] xl:w-full xl:gap-[25px] '>
            <VideoPlayer className='w-full' video={report.video} />
            <div className='flex flex-col gap-[30px] lg:w-3/4'>
                <div className='flex flex-col gap-[15px] xl:gap-5'>
                    <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                        {dateObj.day}.{dateObj.monthNum}.{dateObj.year}
                    </Text>
                    <div className='flex flex-col gap-2.5'>
                        <Text className='text-light-brown' variant={TextVariant.H4}>{report.title}</Text>
                        <div className='flex flex-col gap-[5px]'>
                            {!isOpen ? <Text variant={TextVariant.P}>{truncateToWord(report.text, 70)}...</Text>
                                : <Text variant={TextVariant.P}>{report.text}</Text>
                            }
                            <ExpandButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                        </div>
                    </div>
                </div>
                <div>
                    <SourceLink source={report.source}/>
                </div>
            </div>

        </div>
    );
};

export default ReportComponent;