import React from 'react';
import { PlayerMember, TeamId } from '../types';

interface TugCharacterProps {
  member: PlayerMember;
  team: TeamId;
  index: number; // 0 to 4 (0 is nearest to center rope, 4 is anchor at the end)
  state: 'idle' | 'pulling' | 'straining' | 'won' | 'lost';
  isPullingNow: boolean;
}

export const TugCharacter: React.FC<TugCharacterProps> = ({
  member,
  team,
  index,
  state,
  isPullingNow,
}) => {
  const isBlue = team === 'blue';

  // Base colors
  const jerseyColor = isBlue ? '#2563eb' : '#dc2626'; // Blue-600 vs Red-600
  const jerseyDark = isBlue ? '#1d4ed8' : '#b91c1c';
  const jerseyTrim = isBlue ? '#93c5fd' : '#fca5a5';
  const pantsColor = isBlue ? '#1e3a8a' : '#7f1d1d'; // Navy vs Dark Red
  const skinTone = index % 2 === 0 ? '#f6d8ae' : '#e0ac69';

  // Dynamic lean angles
  // Blue pulls left: leans left (negative rotation).
  // Red pulls right: leans right (positive rotation).
  let rotationDeg = 0;
  let offsetY = 0;
  let offsetX = 0;

  if (state === 'idle') {
    rotationDeg = isBlue ? -8 : 8;
  } else if (state === 'pulling') {
    // Leaning far back to dig heels in
    rotationDeg = isBlue ? (isPullingNow ? -24 : -18) : (isPullingNow ? 24 : 18);
    offsetY = isPullingNow ? 4 : 0;
    offsetX = isBlue ? -6 : 6;
  } else if (state === 'straining') {
    // Being dragged forward towards center!
    rotationDeg = isBlue ? 12 : -12;
    offsetY = -2;
    offsetX = isBlue ? 6 : -6;
  } else if (state === 'won') {
    rotationDeg = (index % 2 === 0 ? -6 : 6);
    offsetY = -12; // jumping!
  } else if (state === 'lost') {
    rotationDeg = isBlue ? 35 : -35;
    offsetY = 16;
  }

  // Anchor (index 4) has larger physique
  const scaleMultiplier = 0.95 + index * 0.05;

  return (
    <div
      id={`char-${team}-${member.id}`}
      className="relative flex flex-col items-center select-none transition-transform duration-150 ease-out"
      style={{
        transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
        width: `${Math.round(33 * scaleMultiplier)}px`,
      }}
    >
      {/* Name and Role Tag */}
      <div
        className={`text-[8px] font-extrabold px-1 py-0.2 rounded-full whitespace-nowrap mb-0.5 shadow-xs transition-all border ${
          isBlue
            ? 'bg-blue-100 text-blue-900 border-blue-300'
            : 'bg-red-100 text-red-900 border-red-300'
        }`}
      >
        <span className="font-extrabold mr-1">#{member.id}</span>
        {member.name}
      </div>

      {/* Character SVG */}
      <svg
        viewBox="0 0 100 130"
        className="w-full h-auto overflow-visible filter drop-shadow-md"
        style={{
          transform: `rotate(${rotationDeg}deg)`,
          transformOrigin: isBlue ? '70% 90%' : '30% 90%',
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Sweat drops when straining or pulling hard */}
        {(state === 'straining' || (state === 'pulling' && isPullingNow)) && (
          <g className="animate-bounce">
            <path
              d="M 50 10 Q 48 18 45 20 A 4 4 0 0 0 53 20 Q 52 18 50 10"
              fill="#38bdf8"
              opacity="0.9"
            />
            <path
              d={isBlue ? "M 30 18 Q 28 24 26 26 A 3 3 0 0 0 32 26 Z" : "M 70 18 Q 68 24 66 26 A 3 3 0 0 0 72 26 Z"}
              fill="#38bdf8"
              opacity="0.9"
            />
          </g>
        )}

        {/* Shadow under feet */}
        <ellipse cx="50" cy="122" rx="28" ry="7" fill="#000" opacity="0.18" />

        {/* Legs & Shoes */}
        <g id={`legs-${team}-${member.id}`}>
          {/* Back Leg (Braced) */}
          <rect
            x={isBlue ? '34' : '52'}
            y="78"
            width="14"
            height="36"
            rx="6"
            fill={pantsColor}
            transform={isBlue ? 'rotate(-25 34 78)' : 'rotate(25 52 78)'}
          />
          {/* Front Leg */}
          <rect
            x={isBlue ? '48' : '38'}
            y="80"
            width="14"
            height="34"
            rx="6"
            fill={pantsColor}
            transform={isBlue ? 'rotate(10 48 80)' : 'rotate(-10 38 80)'}
          />
          {/* Shoes */}
          <ellipse
            cx={isBlue ? '24' : '76'}
            cy="118"
            rx="12"
            ry="7"
            fill="#1f2937"
          />
          <ellipse
            cx={isBlue ? '56' : '44'}
            cy="119"
            rx="11"
            ry="6"
            fill="#111827"
          />
          {/* Shoe sole stripes */}
          <path
            d={isBlue ? 'M 14 122 Q 24 124 34 122' : 'M 66 122 Q 76 124 86 122'}
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Torso / Jersey */}
        <g id={`torso-${team}-${member.id}`}>
          <rect
            x="32"
            y="42"
            width="36"
            height="44"
            rx="10"
            fill={jerseyColor}
          />
          {/* Jersey trim lines */}
          <path
            d="M 32 54 L 68 54"
            stroke={jerseyTrim}
            strokeWidth="3"
            opacity="0.8"
          />
          <path
            d="M 32 60 L 68 60"
            stroke={jerseyTrim}
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Team Number on chest */}
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="18"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            {member.id}
          </text>
        </g>

        {/* Head and Face */}
        <g id={`head-${team}-${member.id}`}>
          {/* Neck */}
          <rect x="44" y="34" width="12" height="12" fill={skinTone} />
          {/* Head */}
          <circle cx="50" cy="26" r="18" fill={skinTone} />

          {/* Ears */}
          <circle cx="31" cy="26" r="4" fill={skinTone} />
          <circle cx="69" cy="26" r="4" fill={skinTone} />

          {/* Hair / Headwear styles */}
          {member.hairStyle === 'spiky' && (
            <path
              d="M 32 20 Q 38 4 44 14 Q 50 2 56 12 Q 62 4 68 18 Q 50 8 32 20 Z"
              fill="#1e1b4b"
            />
          )}
          {member.hairStyle === 'short' && (
            <path
              d="M 32 24 C 32 10 68 10 68 24 C 64 12 36 12 32 24 Z"
              fill="#27272a"
            />
          )}
          {member.hairStyle === 'headband' && (
            <g>
              <path
                d="M 32 22 C 32 10 68 10 68 22 C 60 12 40 12 32 22 Z"
                fill="#18181b"
              />
              <rect
                x="31"
                y="18"
                width="38"
                height="6"
                rx="2"
                fill="#ffffff"
              />
              {/* Headband knot */}
              <circle
                cx={isBlue ? '31' : '69'}
                cy="21"
                r="3"
                fill="#ffffff"
              />
            </g>
          )}
          {member.hairStyle === 'cap' && (
            <g>
              <path
                d="M 31 22 C 31 8 69 8 69 22 Z"
                fill={jerseyDark}
              />
              {/* Cap visor */}
              <ellipse
                cx={isBlue ? '60' : '40'}
                cy="20"
                rx="14"
                ry="4"
                fill={jerseyDark}
              />
            </g>
          )}
          {member.hairStyle === 'bald' && (
            // Shiny bald glare
            <path
              d="M 40 14 Q 45 11 52 12"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
          )}

          {/* Eyes based on state */}
          {state === 'won' ? (
            // Happy closed crescent eyes ^ ^
            <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 40 25 Q 44 20 47 25" />
              <path d="M 53 25 Q 56 20 60 25" />
            </g>
          ) : state === 'lost' ? (
            // Dizzy X X eyes
            <g stroke="#64748b" strokeWidth="2" strokeLinecap="round">
              <line x1="39" y1="21" x2="45" y2="27" />
              <line x1="45" y1="21" x2="39" y2="27" />
              <line x1="55" y1="21" x2="61" y2="27" />
              <line x1="61" y1="21" x2="55" y2="27" />
            </g>
          ) : state === 'straining' ? (
            // Wide panicked eyes
            <g fill="#1e293b">
              <circle cx="43" cy="24" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
              <circle cx="43" cy="24" r="2" />
              <circle cx="57" cy="24" r="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
              <circle cx="57" cy="24" r="2" />
              {/* Slanted worry eyebrows */}
              <path d="M 38 18 L 47 20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              <path d="M 62 18 L 53 20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            // Determined focused eyes
            <g fill="#0f172a">
              <circle cx="43" cy="25" r="2.5" />
              <circle cx="57" cy="25" r="2.5" />
              {/* Fierce angled brows */}
              <path
                d={isBlue ? "M 39 19 L 47 22" : "M 41 22 L 49 19"}
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d={isBlue ? "M 53 22 L 61 19" : "M 51 19 L 59 22"}
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Mouth based on state */}
          {state === 'won' ? (
            <path
              d="M 43 29 Q 50 38 57 29 Z"
              fill="#e11d48"
              stroke="#881337"
              strokeWidth="1.5"
            />
          ) : state === 'lost' ? (
            <path
              d="M 42 34 Q 50 28 58 34"
              stroke="#334155"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : state === 'pulling' ? (
            // Clenched teeth shouting
            <rect
              x="42"
              y="28"
              width="16"
              height="8"
              rx="3"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          ) : (
            <path
              d="M 44 32 L 56 32"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* Arms holding the rope */}
        <g id={`arms-${team}-${member.id}`}>
          {/* Back arm */}
          <path
            d={
              isBlue
                ? 'M 36 50 Q 48 58 64 62'
                : 'M 64 50 Q 52 58 36 62'
            }
            stroke={skinTone}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Front arm with muscular flex */}
          <path
            d={
              isBlue
                ? 'M 40 52 Q 54 62 70 63'
                : 'M 60 52 Q 46 62 30 63'
            }
            stroke={skinTone}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hands gripping */}
          <circle
            cx={isBlue ? '68' : '32'}
            cy="63"
            r="6"
            fill={skinTone}
            stroke={jerseyDark}
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};
