import BorderGlow from '../BorderGlow ';

export default function Sobre() {
  return (
    <section id="sobre" className="py-20">
      <div className="w-full flex flex-col items-center">

        {/* Header */}
        <div className="mb-24 w-full max-w-5xl px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Sobre Nosotros
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl px-4">
            <div className="grid w-full gap-6 grid-cols-7 grid-rows-10 rounded-lg">

              <div
                className="col-span-2 row-span-5  rounded-lg shadow-md flex items-center justify-center"
              >
                
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-3 row-span-5 rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-2 row-span-4  rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-2 row-span-5 rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-2 row-span-5 rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-3 row-span-4s rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

              <div
                className="col-span-5 row-span-1  rounded-lg shadow-md flex items-center justify-center"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#7cff67', '#d9ff1c', '#39FF14']}
                  className="w-full h-full"
                >
                  <div style={{ padding: '2em' }}>
                    <h2>Your Content Here</h2>
                    <p>Hover near the edges to see the glow.</p>
                  </div>
                </BorderGlow>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}




