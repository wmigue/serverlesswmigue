import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const usarFetch = (url) => {

    const [loading, setLoading] = useState(true) //loading = true
    const [data, setData] = useState([]) //data=[]


    const fetchData = () => {
        AsyncStorage.getItem('token')
            .then(x => {
                if (x) {

                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'Application/json',
                            authorization: x, //token
                        },
                    })

                        .then((response) => response.json())
                        .then((data) => {
                            setData(data)
                            setLoading(false)
                        })
                }

            })
    }


    //escucho cuando se produce un cambio, y se lo paso al render.
    useEffect(() => {
        fetchData()
    }, [])


    return { loading, data } //son los valores que voy a necesitar cuando importe.

}

export default usarFetch