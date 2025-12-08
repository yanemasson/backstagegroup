const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-solid border-4 border-b-text-accent  border-text-primary" />
        </div>
    );
};
export default LoadingSpinner;