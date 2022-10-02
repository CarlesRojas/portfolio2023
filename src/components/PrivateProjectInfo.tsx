import { ProjectDetails } from "@prisma/client";
import s from "@styles/components/PrivateProjectInfo.module.scss";
import FileInput from "./FileInput";

interface PrivateProjectInfoProps {
    projectDetails: ProjectDetails;
}

const PrivateProjectInfo = ({ projectDetails }: PrivateProjectInfoProps) => {
    const { name, icon, subtitle, description, technicalDescription, links, qrCode } = projectDetails;

    const quickInfoDOM = name && icon && subtitle && (
        <div className={s.quickInfo}>
            <FileInput
                name="icon"
                accept="image/*"
                className={s.iconInput}
                defaultImage={icon}
                imageSizes="(max-width: 768px) 5rem, 7rem"
            />

            <input className={s.name} type="text" name="name" defaultValue={name} />
            <input type="text" name="subtitle" defaultValue={subtitle} />
        </div>
    );

    // const descriptionDOM = description && description.map((paragraph, i) => <p key={i}>{paragraph}</p>);

    // const processDOM = technicalDescription && <p className={s.low}>{technicalDescription}</p>;

    // const linksDOM =
    //     links &&
    //     links.map((url, i) => (
    //         <a href={url} target="_blank" key={i} rel="noopener noreferrer">
    //             {getLinkIcon(url)}
    //         </a>
    //     ));

    // const qrDOM = qrCode && (
    //     <a href={qrCode} target="_blank" className={s.qr} rel="noopener noreferrer">
    //         <QRCodeSVG value={qrCode} size={512} level="M" bgColor="transparent" fgColor="rgba(0, 0, 0, 0.8)" />
    //     </a>
    // );

    return (
        <div className={s.privateProjectInfo}>
            {quickInfoDOM}
            {/* {descriptionDOM}
                {processDOM}

                {(qrDOM || linksDOM) && (
                    <div className={s.links}>
                        {qrDOM}
                        {linksDOM}
                    </div>
                )} */}

            <button>Save</button>
        </div>
    );
};

export default PrivateProjectInfo;
