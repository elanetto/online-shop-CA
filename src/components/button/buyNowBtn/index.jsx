export function SecondaryBtn ({btn_text, callback}) {
    return (
        <button
            className="px-2 py-4 bg-amber-400 text-red-950 font-medium hover:bg-amber-600"
            onClick={callback}>
            {btn_text}
        </button>
    )
}