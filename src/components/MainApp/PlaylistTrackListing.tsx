import "./PlaylistTrackListing.css";
const PlaylistTrackListing = () => {
    return (
        <table className="ptl-table">
            <thead className="ptl-thead">
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="ptl-tbody">
                <tr>
                    <td>1</td>
                    <td>Phony</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Phony</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Phony</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Phony</td>
                    <td>...</td>
                </tr>
            </tbody>
        </table>
    );
};

export default PlaylistTrackListing;
