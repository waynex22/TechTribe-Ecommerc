const ProductDetailLoading: React.FC = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-7 md:grid-col-2 gap-6">
          <div className="col-span-2 ">
            <div className=" bg-white h-fit rounded-xl">
              <div className="p-4">
                <div
                  className="rounded-xl w-[338px] h-[368px] bg-gray-200 object-cover animate-pulse"></div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg animate-pulse h-3 w-12"></h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <div className="p-4  bg-white h-fit rounded-xl">
              <div className="flex items-center justify-start gap-4">
                <div
                  className="w-[94px] h-[20px]  bg-gray-200 animate-pulse rounded-lg"></div>
                <div
                  className="w-[94px] h-[20px]  bg-gray-200 animate-pulse rounded-lg">

                </div>
                <div className="flex items-center justify-start gap-2">
                  <p className="text-[14px] h-[20px] w-36 bg-gray-200 rounded-lg animate-pulse"></p>
                </div>
              </div>
              <div className="my-4">
                <h3 className="font-light-bold text-lg h-[20px] w-36 bg-gray-200 rounded-lg animate-pulse">

                </h3>
              </div>
              <div className="my-4 h-[20px] w-[300px] bg-gray-200 rounded-lg animate-pulse">
                
              </div>
              <div className="my-4 h-[40px] w-[300px] bg-gray-200 rounded-lg animate-pulse">
                
              </div>

              <div className="mb-4">
                <p className="text-[14px] h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></p>
                <div className="flex gap-2 mt-2 ">
                  {Array.from({ length: 5 }).map((_, index: number) => (
                    <div
                      key={index}
                      className="p-2 h-[50px] w-[70px] bg-gray-200 rounded-lg animate-pulse"
                    >
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[14px] h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></p>
                <div className="flex gap-2 mt-2 ">
                  {Array.from({ length: 5 }).map((_, index: number) => (
                    <div
                      key={index}
                      className="p-2 h-[30px] w-[50px] bg-gray-200 rounded-lg animate-pulse"
                    >
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
              <h3 className="text-[14px] h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></h3>
              <div className="h-[20px] w-40 bg-gray-200 rounded-lg animate-pulse my-2">
              </div>
              <div className="h-[20px] w-[300px] bg-gray-200 rounded-lg animate-pulse my-2">
              </div>
              <div className="h-[20px] w-40 bg-gray-200 rounded-lg animate-pulse my-2">
              </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
            <h3 className="text-[14px] h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></h3>
            <div className="h-[20px] w-[200px] bg-gray-200 rounded-lg animate-pulse my-2">
            </div>
            <div className="h-[20px] w-[250px] bg-gray-200 rounded-lg animate-pulse my-2">
            </div>
            <div className="h-[20px] w-[300px] bg-gray-200 rounded-lg animate-pulse my-2">
            </div>
            </div>
            <div className="p-4 mt-4 bg-white rounded-xl">
            <h3 className="text-[14px] h-[20px] w-36 bg-gray-200 rounded-lg animate-pulse"></h3>
              <div className="grid md:grid-cols-4 lg:grid-cols-3 gap-4 items-center mt-2">
                {Array.from({ length: 6 }).map((_, index: number) => (
                  <>
                  <div key={index} className="col-span-1 bg-gray-200 rounded-lg animate-pulse h-[120px] w-full">
                  </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white h-fit rounded-xl">
            <div className="p-4">
              <div className="flex gap-4 ">
                <div
                  className="rounded-full w-12 h-12 bg-gray-200 animate-pulse"></div>
                <div className="flex flex-col ">
                <h3 className="text-[14px] h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></h3>
                  <div className="flex gap-2 items-center">
                    <div
                      className="rounded-xl bg-gray-200 animate-pulse h-4 w-14"
                    ></div>
                    <div className="rounded-xl bg-gray-200 animate-pulse h-4 w-36"></div>
                  </div>
                  <div className="my-2">
                    <div className="flex items-center justify-start gap-4">
                      <div className="w-[100px] cursor-pointer h-[30px] bg-gray-200 rounded-lg animate-pulse">
                      </div>
                      <div className="w-[100px] cursor-pointer h-[30px] bg-gray-200 rounded-lg animate-pulse">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[0.1px] bg-gray-200 my-2"></div>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 object-cover bg-gray-200 animate-pulse rounded-lg"></div>
                <span className="text-md font-light-bold h-[20px] w-24 bg-gray-200 rounded-lg animate-pulse"></span>
              </div>
              <div className="my-2">
                <p className="font-semibold text-sm text-gray-900 h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></p>
                <div className="flex items-center space-x-2 my-2 mb-4 bg-gray-200 p-4 rounded-lg animate-pulse h-11 w-36">
                 
                </div>
                <div className="text-gray-600 h-[20px] w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="my-2 text-black gap-2">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductDetailLoading;