import React from 'react'

const BuyerDashboard = () => {
  return (
    <div className="w-full max-w-6xl">
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="bg-purple-100 p-6 shadow-lg rounded-lg">
                      <h1 className="text-lg font-semibold">Total Books</h1>
                      <p className="text-2xl font-bold text-black">120</p>
                      <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  ))}
              </div>
              
            </div>
  )
}

export default BuyerDashboard
