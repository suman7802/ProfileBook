import PropTypes from 'prop-types';

export default function ConfirmDialog({ message, confirmColor, onConfirm, onCancel }) {
  return (
    <div className="fixed w-80 top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#e4e7ebe4] border border-gray-300 rounded-md">
      <div className="m-10 flex flex-col gap-4 items-center">
        <p>{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className={`bg-${confirmColor}-500 hover:bg-${confirmColor}-600 text-white px-4 py-2 rounded-md`}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
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
