import useAxios from "axios-hooks"
const OSBGenres = () => {
    const [{data, loading, error}, refetch] = useAxios({
        url: "/api/indexes/artists",
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });
    return <div>{JSON.stringify(data)}</div>
};

export default OSBGenres;