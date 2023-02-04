export default function Blobs () {
  return (
    <>
      <div className='absolute -z-10 opacity-10 bg-cover bg-no-repeat blur-2xl blobTopLeft md:top-[5%] xs:top-0 xs:left-0' />
      <div className='absolute -z-10 opacity-10 bg-cover bg-no-repeat blur-2xl blobTopRight md:top-[10%] md:right-[2%] xs:top-0 xs:right-0 ' />
      <div className='absolute -z-10 opacity-20 bg-cover bg-no-repeat blur-3xl blobBottomLeft md:bottom-[2%] md:left-[2%] xs:bottom-0 xs:left-0' />
    </>
  )
}
