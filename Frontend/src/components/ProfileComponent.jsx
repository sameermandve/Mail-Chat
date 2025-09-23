import React from 'react'

function ProfileComponent({title, value, Icon}) {
    return (
        <div className="flex flex-col justify-start border-2 border-base-content/50 py-2 px-4 rounded-lg">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="size-5 text-base-content/70" />}
                <h1 className="font-semibold text-base-content/60">{title}</h1>
            </div>
            <p className="sm:text-xl text-lg font-semibold tracking-wide mt-2">{value}</p>
        </div>
    );
}

export default ProfileComponent