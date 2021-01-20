import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './Types';

const initialPosition = {
    lat: -23.4242689,
    lng: -51.941555
};

type Place = {
    label?: string; //o ? indica que não é obrigatório
    value?: string;
    position: {
        lat: number;
        lng: number;
    }
};

type Props = {
    onChangeLocation: (location: OrderLocationData) => void;
}

function OrderLocation({onChangeLocation} : Props) {

    const [address, setAddress] = useState<Place>({
        position: initialPosition
    });

    const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
        const response = await fetchLocalMapBox(inputValue);

        const places = response.data.features.map((item: any) => {
            return ({
                label: item.place_name,
                value: item.place_name,
                position: {
                    lat: item.center[1],
                    lng: item.center[0]
                }
            });
        });

        callback(places);
    };

    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
            address: place.label!, //como o label é opcional, o ! indica que nesse caso o label está completo
            latitude: place.position.lat,
            longitude: place.position.lng

        });
    };

    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect
                        placeholder="Digite um endereço para entregar o pedido"
                        className="filter"
                        loadOptions={loadOptions}
                        onChange={value => handleChangeSelect(value as Place)}
                    />

                </div>
                <MapContainer
                    center={address.position}
                    zoom={13}
                    key={address.position.lat} //renderizar o mapa a cada novo endereço
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={address.position}>
                        <Popup>
                            {address.label}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>

    )
}

export default OrderLocation;