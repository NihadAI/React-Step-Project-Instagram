import React, { useEffect } from 'react';
import NavSidebar from '../components/navigation/NavSidebar';
import Timeline from '../components/timeline/Timeline';

function Home() {
    return (
        <>
            <div className="homepage">
                <div className="homepage__nav">
                    <NavSidebar />
                </div>
                <div className="homepage__timeline">
                    <Timeline />
                </div>
            </div>
        </>
    );
}

export default Home;
