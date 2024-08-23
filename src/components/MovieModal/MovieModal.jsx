import React from 'react';

const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen,
}) => {
    return (
        <div>
            <div className="presentation" role="presentation">
                <span
                    className="modal-close"
                    onClick={() => {
                        setModalOpen(false);
                    }}
                >
                    X
                </span>
                <img
                    className="modal_poster-img"
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="modal-img"
                />
                <div className="modal_content">
                    <p className="modal_details">
                        <span className="modal_user_perc">100% for you</span>
                        {release_date ? release_date : first_air_date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
