import PropTypes from 'prop-types';

export default function ConfirmDialog({
  message,
  confirmColor,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed left-1/2 top-80 z-10 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-md border border-gray-300 bg-[#e4e7ebe4]">
      <div className="m-10 flex flex-col items-center gap-4">
        <p>{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className={`bg-${confirmColor}-500 hover:bg-${confirmColor}-600 rounded-md px-4 py-2 text-white`}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  confirmColor: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
