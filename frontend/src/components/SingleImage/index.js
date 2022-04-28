// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ModalImage } from '../../context/ImageModal';
// import ImageDetail from '../ImageDetail';
// import './SingleImage.css'


// const SingleImage = ({ image }) => {
//     // const [showModal, setShowModal] = useState(false);
//   const image = useSelector(state => state.images);

//     const handleImgError = (e) => {
//         e.target.src = '../../../../static/not-image.png';
//     }

//     return (
//         <div className='image-div'>
//             <h2 className='image-title'>{image.content}</h2>
//             {}
//             <Link key={images.id} to={`/images/${image?.id}`}>
//                 <img
//                     onClick={() => setShowModal(true)}
//                     key={image.id}
//                     src={image.imageUrl}
//                     alt={image.content}
//                     onError={handleImgError}
//                     className="single-image"
//                 />
//             </Link>
//             {/* {showModal && (
//                 <ModalImage onClose={() => setShowModal(false)}>
//                     <ImageDetail image={image} description={image.content} showModal={setShowModal} />
//                 </ModalImage>
//             )} */}
//         </div>
//     )
// }

// export default SingleImage;
