import React, { useState, useEffect } from 'react';
import { useNavermaps } from 'react-naver-maps';
import { makeMarkerClustering } from "./MarkerClustering.js";
import accidentDeath from "./accidentdeath.js";
import addMarkers from './Marker.jsx'; // 실제 사용하는 Overlay 컴포넌트로 교체하세요

const MarkerClustering = makeMarkerClustering(window.naver);

const useGetClusterIcon = (navermaps) => {
    const htmlMarker1 = {
        content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
        size: navermaps.Size(40, 40),
        anchor: navermaps.Point(20, 20),
    };
    const htmlMarker2 = { ...htmlMarker1, content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>' };
    const htmlMarker3 = { ...htmlMarker1, content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>' };
    const htmlMarker4 = { ...htmlMarker1, content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>' };
    const htmlMarker5 = { ...htmlMarker1, content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>' };

    return { htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5 };
};

function MarkerCluster({ map }) {
    const navermaps = useNavermaps();
    const { htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5 } = useGetClusterIcon(navermaps);
    const data = accidentDeath.searchResult.accidentDeath;

    const [cluster, setCluster] = useState(null);

    useEffect(() => {
        if (!map || cluster) return;

        const markers = data.map(spot => {
            const latlng = new navermaps.LatLng(spot.grd_la, spot.grd_lo);
            return new navermaps.Marker({
                position: latlng,
                draggable: true,
            });
        });

        const newCluster = new MarkerClustering({
            minClusterSize: 2,
            maxZoom: 8,
            map: map,
            markers: markers,
            disableClickZoom: false,
            gridSize: 120,
            icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
            indexGenerator: [10, 100, 200, 500, 1000],
            stylingFunction: function (clusterMarker, count) {
                const element = clusterMarker.getElement();
                const firstChildDiv = element.querySelector('div:first-child');
                if (firstChildDiv) {
                    firstChildDiv.innerText = count;
                }
            },
        });

        setCluster(newCluster);

        return () => {
            newCluster.setMap(null);
        };
    }, [map, cluster, navermaps, data, htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5]);

    return cluster ? <addMarkers element={cluster} /> : null;
}

export default MarkerCluster;
