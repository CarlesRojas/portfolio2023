import { ProjectDetails } from "@prisma/client";
import s from "@styles/components/ProjectInfo.module.scss";
import Image from "next/future/image";
import { RiExternalLinkFill, RiGithubFill, RiGooglePlayFill, RiWindowsFill } from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";

interface ProjectInfoProps {
    projectDetails: ProjectDetails;
}

const ProjectInfo = ({ projectDetails }: ProjectInfoProps) => {
    const { name, icon, subtitle, description, technicalDescription, links, qrCode } = projectDetails;
    console.log(projectDetails);
    const getLinkIcon = (link: string) => {
        if (link.includes("github")) return <RiGithubFill />;
        if (link.includes("google")) return <RiGooglePlayFill />;
        if (link.includes("microsoft")) return <RiWindowsFill />;
        return <RiExternalLinkFill />;
    };

    const quickInfoDOM = name && icon && subtitle && (
        <div className={s.quickInfo}>
            <Image src={icon} alt="" priority width="128" height="128" />

            <h1>{name}</h1>
            <h2>{subtitle}</h2>
        </div>
    );

    const descriptionDOM = description && description.map((paragraph, i) => <p key={i}>{paragraph}</p>);

    const processDOM = technicalDescription && <p className={s.low}>{technicalDescription}</p>;

    const linksDOM =
        links &&
        links.map((url, i) => (
            <a href={url} target="_blank" key={i} rel="noopener noreferrer">
                {getLinkIcon(url)}
            </a>
        ));

    const qrDOM = qrCode && (
        <a href={qrCode} target="_blank" className={s.qr} rel="noopener noreferrer">
            <QRCodeSVG value={qrCode} size={512} level="M" bgColor="transparent" fgColor="rgba(0, 0, 0, 0.8)" />
        </a>
    );

    return (
        <div className={s.projectInfo}>
            {quickInfoDOM}
            {descriptionDOM}
            {processDOM}

            {(qrDOM || linksDOM) && (
                <div className={s.links}>
                    {qrDOM}
                    {linksDOM}
                </div>
            )}
        </div>
    );
};

export default ProjectInfo;
