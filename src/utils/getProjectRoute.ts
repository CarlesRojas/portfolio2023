import { RoutePaths } from "@interfaces/routes";

export const getProjectRoute = (name: string) => {
    return `${RoutePaths.DETAILS}/${name.split(" ").join("_")}`;
};
