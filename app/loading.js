

export default function Loading() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-dark">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
