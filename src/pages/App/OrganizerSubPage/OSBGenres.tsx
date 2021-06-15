import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import EditArtistModal from "../../../components/MainApp/OrganizerSubComponent/EditArtistModal";
import useAxios from "axios-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddArtistModal from "../../../components/MainApp/OrganizerSubComponent/AddArtistModal";
import { Button } from "react-bootstrap";
import { axios } from "../../../global-imports";
const OSBGenres = (props: any) => {
    const [showModal, setshowModal] = useState(false);
    const [showAddModalBox, setshowAddModalBox] = useState(false);
    const [rowData, setRowData] = useState<{
        genre_id: string;
        genre_name: string;
    }>({ genre_id: "", genre_name: "" });
    const [t_data, set_t_data] = useState<any>([]);
    const [
        { data: genresData, loading: genresLoading, error: genresError },
        genresRefetch,
    ] = useAxios({
        url: "/api/indexes/genres",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });
    useEffect(() => {
        if (genresLoading) {
            return;
        }
        let inner_t_data: any = [];
        let genreIds = Object.keys(genresData.genres);
        for (let i = 0; i < genreIds.length; i++) {
            inner_t_data.push({
                genre_id: genreIds[i],
                genre_name: genresData.genres[genreIds[i]].genre_name,
            });
        }
        set_t_data(inner_t_data);
    }, [genresData, genresLoading]);

    return genresLoading ? (
        <div>Loading...</div>
    ) : genresError ? (
        <div>
            An error occured
            <br />
            Please try again later
        </div>
    ) : (
        <div
            className={props.className === undefined ? "" : props.className}
            style={props.style ? props.style : {}}
        >
            <MaterialTable
                columns={[
                    {
                        title: "genre_id",
                        field: "genre_id",
                        hidden: true,
                    },
                    {
                        title: "Genre Name",
                        field: "genre_name",
                    },
                ]}
                data={t_data}
                editable={{
                    onRowDelete: (oldData: any) =>
                        new Promise((resolve, reject) => {
                            let gid = oldData.genre_id;
                            axios({
                                url: `/api/indexes/genres/${gid}`,
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${localStorage.token}`,
                                },
                            })
                                .then((response: any) => {
                                    const dataDelete = [...t_data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    set_t_data([...dataDelete]);
                                    resolve(true);
                                })
                                .catch((error: any) => {
                                    console.error(error);
                                    alert("Unable to remove this genre");
                                    reject();
                                });
                        }),
                    onRowAdd: (newData: any) =>
                        new Promise((resolve, reject) => {
                            let g_name = newData.genre_name.trim();
                            if (g_name === "") {
                                alert("Genre Name cannot be empty");
                                reject();
                                return;
                            }
                            let payload: any = {
                                genres: [
                                    {
                                        genre_name: g_name,
                                    },
                                ],
                            };
                            axios({
                                url: `/api/indexes/genres`,
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${localStorage.token}`,
                                },
                                data: payload,
                            })
                                .then((response: any) => {          
                                    newData.genre_id = (Object.values(response.data.genres)[0] as any).genreid;
                                    set_t_data([newData, ...t_data]);
                                    resolve(true);
                                })
                                .catch((error: any) => {
                                    console.error(error);
                                    alert("Unable to add this genre");
                                    reject();
                                });
                        }),
                    onRowUpdate: (newData: any, oldData: any) =>
                        new Promise((resolve, reject) => {
                            let gid = oldData.genre_id;
                            let g_name = newData.genre_name.trim();
                            if (g_name === "") {
                                alert("Genre Name cannot be empty");
                                reject();
                                return;
                            }
                            let payload: any = {
                                genre_name: g_name,
                            };
                            axios({
                                url: `/api/indexes/genres/${gid}`,
                                method: "PUT",
                                headers: {
                                    Authorization: `Bearer ${localStorage.token}`,
                                },
                                data: payload
                            })
                                .then((response: any) => {
                                    const dataUpdate = [...t_data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    set_t_data([...dataUpdate]);

                                    resolve(true);
                                })
                                .catch((error: any) => {
                                    console.error(error);
                                    alert("Unable to update this genre");
                                    reject();
                                });
                        }),
                }}
                title="Genres"
                // title="Artist"
                icons={TABLE_ICONS}
            />
        </div>
    );
};

export default OSBGenres;
