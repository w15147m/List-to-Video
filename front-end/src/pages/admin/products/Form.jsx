import React, { useEffect, useState, useRef, useMemo } from 'react';
import CommonLayout from '@/layouts/CommonLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useForm } from 'react-hook-form';
import { post, put } from '@/services/apiServices';
import { toast } from 'react-toastify';
import BtnLoader from '@/components/BtnLoader';
import { fetchData } from '../utils/fetch';
import Select from 'react-select';
import JoditEditor from 'jodit-react';
import { TrashIcon } from '@/assets/SVGs/commonSVJs';

const Form = () => {

  const [isLoader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [updateImage, setupDateImage] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const descriptionEditor = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 250,
    buttons: 'bold,italic,underline,|,ul,ol,|,link,unlink,|,source',
    removeButtons: ['brush', 'file', 'image', 'video', 'table', 'hr', 'eraser', 'copyformat', 'superscript', 'subscript', 'indent', 'outdent', 'classspan'],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false
  }), []);


  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
  const brandOptions = brands.map(brand => ({ value: brand.id, label: brand.name }));

  useEffect(() => {
    fetchData('/categories', setCategories, () => { });
    fetchData('/brands', setBrands, () => { });
    fetchData('/sizes', setSizes, () => { });

  }, []);

  useEffect(() => {
    setValue('category', product?.category || '');
    setValue('brand', product?.brand || null);
    if (product) {
      setValue('title', product.title);
      setValue('price', product.price);
      setValue('qty', product.qty);
      setValue('sku', product.sku);
      setValue('compare_price', product.compare_price);
      setValue('status', product.status ? '1' : '0');
      setValue('is_featured', product.is_featured);
      setValue('description', product.description || '');
      setValue('short_description', product.short_description || '');
      if (product.category && categoryOptions.length > 0) {
        const initialCat = categoryOptions.find(opt => opt.value === product.category);
        setSelectedCategory(initialCat);
      }

      if (product.brand && brandOptions.length > 0) {
        const initialBrand = brandOptions.find(opt => opt.value === product.brand);
        setSelectedBrand(initialBrand);
      }
      if (product?.images?.length) {
        const imgs = product.images.map(({ image_url }) => image_url);
        setGalleryImages(imgs);
      }
    }
    register('description');
  }, [product, categoryOptions.length, brandOptions.length, setValue, register]);


  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    setValue('category', option ? option.value : '', { shouldValidate: true });
  };

  const handleBrandChange = (option) => {
    setSelectedBrand(option);
    setValue('brand', option ? option.value : null);
  };

  const handleEditorBlur = (newContent, fieldName) => {
    setValue(fieldName, newContent, { shouldValidate: false });
  };


  const saveData = async (data) => {
    setLoader(true);
    const payload = {
      ...data,
      price: parseFloat(data.price),
      compare_price: data.compare_price ? parseFloat(data.compare_price) : null,
      qty: parseInt(data.qty, 10),
      status: parseInt(data.status, 10),
      category: data.category ? parseInt(data.category, 10) : null,
      brand: data.brand ? parseInt(data.brand, 10) : null,
      gallery: gallery
    };

    try {
      if (product) {
        const result = await put(`/products/${product.id}`, payload);
        toast.success(result.message || 'Product updated successfully');
      } else {
        const result = await post('/products', payload);
        toast.success(result.message || 'Product created successfully');
      }
      // navigate('/admin/products');
    } catch (err) {
      if (err.errors) {
        Object.keys(err.errors).forEach(key => {
          setError(key, {
            type: 'server',
            message: err.errors[key][0]
          });
        });
      }
    } finally {
      setLoader(false);
    }
  };
  // 1760176542.png
  const handleFile = async (e) => {
    setLoader(true);
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    try {
      const result = await post('/tem-images', formData);
      gallery.push(result.data.id);
      galleryImages.push(result.data.image_url);
      setGallery(gallery);
      setGalleryImages(galleryImages);
      setLoader(false);
      e.target.value = '';
    } catch (error) {
      setLoader(false);
      e.target.value = '';
    }
  };

  const handleTrash = async (img) => {
    const filteredImages = galleryImages.filter(image => image !== img);
    setGalleryImages(filteredImages);
    if (product) {
      const filteredImages = product.images.filter(image => image !== img);
      setGalleryImages(filteredImages);

    }
  }

  return (
    <CommonLayout>
      <div className="container">
        <div className='d-flex justify-content-between mb-3 pd-r-px-24'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/products/">Products</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product ? 'Edit' : 'Create'}
              </li>
            </ol>
          </nav>
          <Link to='/admin/products' className="btn btn-primary">Back</Link>
        </div>
        <div className="row pb-5">
          <div className="col-md-3 checkbox-cards">
            <Sidebar />
          </div>
          <div className="col-md-9 row">
            <div className="col-md-12 checkbox-cards">
              <form onSubmit={handleSubmit(saveData)}>
                <div className="card shadow border-0 mb-3">
                  <div className="card-body p-4">
                    <div className='row'>
                      <div className='col-md-6 mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                          type="text"
                          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                          placeholder='Enter product title'
                          {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title.message}</div>)}
                      </div>
                      <div className='col-md-6 mb-3'>
                        <label className='form-label'>SKU</label>
                        <input
                          type="text"
                          className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                          placeholder='Enter SKU'
                          {...register('sku', { required: 'SKU is required' })}
                        />
                        {errors.sku && (<div className="invalid-feedback">{errors.sku.message}</div>)}
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Price</label>
                        <input
                          type="number"
                          step="0.01"
                          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                          placeholder='Enter price'
                          {...register('price', { required: 'Price is required', valueAsNumber: true })}
                        />
                        {errors.price && (<div className="invalid-feedback">{errors.price.message}</div>)}
                      </div>
                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Compare Price (Optional)</label>
                        <input
                          type="number"
                          step="0.01"
                          className={`form-control ${errors.compare_price ? 'is-invalid' : ''}`}
                          placeholder='Enter compare price'
                          {...register('compare_price')}
                        />
                        {errors.compare_price && (<div className="invalid-feedback">{errors.compare_price.message}</div>)}
                      </div>
                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Quantity</label>
                        <input
                          type="number"
                          className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
                          placeholder='Enter quantity'
                          {...register('qty', { required: 'Quantity is required', valueAsNumber: true })}
                        />
                        {errors.qty && (<div className="invalid-feedback">{errors.qty.message}</div>)}
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Category</label>
                        <Select
                          options={categoryOptions}
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                          placeholder="Select Category"
                          isClearable={false}
                          className={errors.category ? 'is-invalid-select' : ''}
                        />
                        {errors.category && (<div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.category.message}</div>)}
                        <input type="hidden" {...register('category', { required: 'Category is required' })} />
                      </div>

                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Brand (Optional)</label>
                        <Select
                          options={brandOptions}
                          value={selectedBrand}
                          onChange={handleBrandChange}
                          placeholder="Select Brand"
                          isClearable={true}
                        />
                        <input type="hidden" {...register('brand')} />
                      </div>
                      <div className='col-md-4 mb-3'>
                        <label className='form-label'>Select sizes</label>
                        <select
                          className={`form-control ${errors.sizes ? 'is-invalid' : ''}`}
                          defaultValue="1"
                          {...register('sizes', { required: 'sizes is required' })}
                        >
                            <option  selected disabled > Select sizes </option>
                          {
                            sizes.map((size) => (
                              <option key={size.id} value={size.id}>
                                {size.name}
                              </option>
                            ))
                          }

                        </select>
                        {errors.sizes && (<div className="invalid-feedback">{errors.sizes.message}</div>)}
                      </div>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Short Description (Optional)</label>
                      <textarea
                        className={`form-control`}
                        rows="1"
                        placeholder='Enter short description'
                        {...register('short_description')}
                      ></textarea>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Description (Optional)</label>
                      <JoditEditor
                        ref={descriptionEditor}
                        value={watch('description') || product?.description || ''}
                        config={editorConfig}
                        onBlur={newContent => handleEditorBlur(newContent, 'description')}
                        onChange={() => { }}
                      />
                    </div>

                    <div className='row'>
                      <div className='col-md-6 mb-3'>
                        <label className='form-label'>Status</label>
                        <select
                          className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                          defaultValue="1"
                          {...register('sizes', { required: 'sizes is required' })}
                        >
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                        {errors.status && (<div className="invalid-feedback">{errors.status.message}</div>)}
                      </div>
                      <div className='col-md-6 mb-3'>
                        <label className='form-label'>Is Featured</label>
                        <select
                          className={`form-control ${errors.is_featured ? 'is-invalid' : ''}`}
                          defaultValue="no"
                          {...register('is_featured', { required: 'Featured status is required' })}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.is_featured && (<div className="invalid-feedback">{errors.is_featured.message}</div>)}
                      </div>
                      <div className='col-md-12 mb-3 gap-2'>
                        <label className='form-label'>Images</label>
                        <div className='d-flex  w-100' style={{ flexWrap: 'wrap' }}>
                          <div className='w-px-180 mx-2 max-h-px-200 mb-3' >
                            <label className="custom-file-upload">
                              <div className="file-input-wrapper" >
                                {
                                  isLoader ? <> <div className="upload-icon">
                                    <div className="spinner-border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </div>
                                    <div className="upload-text"> Loading...</div>
                                  </>
                                    :
                                    <> <div className="upload-icon">
                                      <svg viewBox="0 0 24 24">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                      </svg>
                                    </div>
                                      <div className="upload-text">upload</div>
                                      <div className="upload-subtext">image</div>
                                    </>

                                }

                              </div>
                              <input type="file" id="fileInput" className="file-input-hidden" onChange={handleFile} />
                            </label>
                          </div>
                          {
                            galleryImages && galleryImages.map((image, index) => {
                              return (
                                <div className='max-w-px-180 mx-2 max-h-px-200 position-relative' key={index} >
                                  <div className='card shadow  rounded'>
                                    <img src={image} alt="" className='rounded' />
                                  </div>
                                  <span className='position-absolute end-0 bottom-0 me-1 mb-1' onClick={() => handleTrash(image)}>
                                    <TrashIcon />
                                  </span>
                                </div>
                              )
                            })
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  {
                    isLoader ? <BtnLoader /> : <button type='submit' className='btn btn-primary '>{product ? 'Update' : 'Create'}</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}

export default Form