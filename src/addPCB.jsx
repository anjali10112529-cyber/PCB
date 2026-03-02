
import React, {useState, useEffect, useRef} from 'react';


function AddPCB() {
    const [pcbs, setPcbs] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        location: '',
        quantity: 0,
        minStock: 1,
        status: ''
    });

    const brandRef = useRef(null);
    useEffect (() =>{
        const StoredData = localStorage.getItem("pcbData");
        if(StoredData) {
            setPcbs(JSON.parse(StoredData));
        }
    },[]);

     useEffect(() => {
        localStorage.setItem("pcbData", JSON.stringify(pcbs));
    }, [pcbs]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "minStock"
                ? Number(value)
                : value
        });
    };

    const handleAdd = () => {

        if (!formData.brand || !formData.model) {
            alert("Brand and Model are required");
            return;
        }

        const newPCB = {
            id: Date.now(),
            ...formData
        };

        setPcbs([...pcbs, newPCB]);

        setFormData({
            brand: '',
            model: '',
            location: '',
            quantity: 0,
            minStock: 1,
            status: ''
        });
        brandRef.current.focus();
    };


    return(
        <div>
        <div className='container m-5 bg-light fixed-top'>
            <div className='p-2 d-flex align-items-center justify-content-between'>
                <span > 
                    <h2 className='pl-4 text-dark '>PCB Stock</h2>
                    <p className='text-muted'>Manage PCB inventory levels</p>                    
                </span>
                <div>
                    <button className='btn btn-dark m-4 text-white'>Sell PCB</button>
                    <button className='btn btn-dark m-4 text-white' data-bs-toggle='modal' data-bs-target='#myModal'>Add PCB</button>
                </div>
            </div>
            <div className='container-fluid bg-white m-4'>
                <div className=''>
                    <input type='text' name='search' placeholder=' 🔍 Search here...  ' className='rounded w-50 pl-4 p-1 my-4 mx-2 border-1 border-muted bg-light'></input>                    
                </div>
                <div>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>BRAND</td>
                                <td>MODEL</td>
                                <td>LOCATION</td>
                                <td>QUANTITY</td>
                                <td>MIN STOCK</td>
                                <td>STATUS</td>
                                <td>ACTIONS</td>
                            </tr>
                        </thead>
                        <tbody>
                            {pcbs.length === 0 ?(
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No Pcb data
                                    </td>
                                </tr>
                            ) : (
                                pcbs.map((pcb) => (
                                <tr key={pcb.id}>
                                    <td>{pcb.brand}</td>
                                    <td>{pcb.model}</td>
                                    <td>{pcb.location}</td>
                                    <td>{pcb.quantity}</td>
                                    <td>{pcb.minStock}</td>
                                    <td>
                                        {pcb.quantity <= pcb.minStock
                                            ? "Low Stock"
                                            : "In Stock"}
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-sm btn-danger'
                                            onClick={() =>
                                                setPcbs(pcbs.filter(p => p.id !== pcb.id))
                                            }>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
        <div className='modal fade' id='myModal' tabIndex="-1">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='text-center'>Product Check-in</h4>
                        </div>
                        <div className='modal-body'>
                            <form>
                            <div className='w-100 m-2 p-2'>
                                <label className='form-label'>Brand name</label>
                                <input ref={brandRef} value={formData.brand} onChange={handleChange} type='text' name='brand' placeholder='Your brand name...' className='form-control'></input>
                            </div>
                            <div className='w-100 m-2 p-2'>
                                <label className='form-label'>Model</label>
                                <input type='text' name='model' value={formData.model} onChange={handleChange} placeholder='Your model name...' className='form-control'></input>
                            </div>
                            <div className='w-100 m-2 p-2'>
                                <label className='form-label'>Location</label>
                                <input type='text' name='location' value={formData.location} onChange={handleChange} placeholder='Your location here...' className='form-control'></input>
                            </div>
                            <div className='row mb-2'>
                             <div className='col-6 '>
                                <label className='form-label'>Quantity</label>
                                <input type='text' name='quantity' placeholder='0' value={formData.quantity} onChange={handleChange} className='form-control'></input>
                            </div>
                            <div className='col-6 '>
                                <label className='form-label'>MinStock</label>
                                <input type='text' name='minStock' value={formData.minStock} onChange={handleChange} placeholder='1' className='form-control'></input>
                            </div>
                            </div>
                            <div className='w-100 m-2 p-2'>
                                <label className='form-label'>Status</label>
                                <input type='text' name='status' placeholder='Stock info...' value={formData.status} onChange={handleChange} className='form-control'></input>
                            </div>
                            </form>
                        </div>
                        <div className='modal-footer mx-auto'>
                            <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>Cancel</button>
                            <button type='button' className='btn btn-success' onClick={handleAdd}>Add</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default AddPCB;