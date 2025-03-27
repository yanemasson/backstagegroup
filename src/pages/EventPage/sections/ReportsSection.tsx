import Text, {TextVariant} from "../../../components/Text.tsx";
import {useReports} from "../../../hooks/cms/useReports.ts";
import {Report} from "../../../types/report.ts";
import ReportComponent from "../../../components/ReportComponent.tsx";

const ReportsSection = () => {
    const { reports } = useReports()
    return (
        <section className='flex flex-col gap-10 xl:gap-[50px]'>
            <Text variant={TextVariant.H2}>РЕПОРТАЖИ И ВИДЕООТЗЫВЫ</Text>
            <div className='flex flex-col gap-2.5 xl:flex-row xl:justify-between'>
                {reports
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 2)
                    .map((report: Report) => (
                        <ReportComponent key={report.id} report={report} />
                    ))}
            </div>
        </section>
    );
};

export default ReportsSection;